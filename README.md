# Oracle Kubernetes Engine first steps

First steps with Docker, Kubernetes and Oracle Kubernetes Engine (OKE).

We are going to build, dockerize and deploy an application with this architecture.

![Architecture](images/use-case.jpg)

# What do we cover?

- Create a Kubernetes cluster with Oracle Cloud.
- Explain virtual machines, containers, Docker, container registry, and Kubernetes.
- Dockerize your application.
- Run your application locally with Docker.
- Configure `kubectl` to talk to your cluster.
- Deploy your application in OKE.
- Scale up and down your application


---


## Virtual Machines

It is a **virtualization** of a computer system.

Through software, it **simulates the underlying hardward**. The software is called **hyper-visor**.

Examples: **VirtualBox**, **KVM**, **QEMU**, **Hyper-V**, **VMWare**, etc.

There are two types but they work in a similar way:

![Hypervisor](images/hypervisors.png)

On top of that virtual system you **install a complete operative system**.

## Containers

**Lightweight virtualization technology** based on Linux kernel.

It produces **portable images** that you can run in any Linux host machine.

It has a **fast start time**.

The underlying technology is: `cgroups` and `namespaces` of Linux kernel.

- `cgroups` is "what you can use" from your host machine. Memory, CPU, block I/O, network, ...
- `namespaces` is "what you can see" from your host machine. Pid, net, mnt, uts, ipc, ...

### Why containers are useful

Compare virtual machines and containers stack:

|                 Virtual Machines                 |              Containers              |
| :----------------------------------------------: | :----------------------------------: |
| ![Virtual Machines](images/virtual-machines.png) | ![Containers](images/containers.png) |

It **streamlines the pipeline** of development, testing and deployment of applications.

Developers can modify the code, run them in containers that isolate the execution from the local developer machine (**the end of "it works on my machine"**).

When a developer is ready, she can push the code to the repository what kick off a remote building that **create container images** and **archive them in a repository of images**.

After that, Operations can **take those images and deployment** in testing and production enviroments.

The whole process is creating deliverables isolated from local hacks to make it work on a specific environment.

Because is a lightweight virtualization technology, spinning new containers from an image is quick and easy. Perfect to **scale your application on demand**.

## Docker

Docker is the most popular container technology. Docker is just a toolkit that abstract the complexity of `cgroups` and `namespaces`.

Docker images are composed by **layers** of modifications on top of based images.

## Kubernetes

Kubernetes is an **open-source** system for **automating deployment**, **scaling** and **management of containerized applications**. It groups containers that make up an application into logical units for easy management and discovery.

### Kubernetes components (some of them)

- **Pod** is the smallest deployable object in Kubernetes. Containers run inside to do just one job. The pod doesn't make sense without all of those containers running.
- **Deployment** is a declaration of the topology of your application for Pods and other Kubernetes object models.
- **Service** is an abstract way to expose an application running on a set of Pods as a network service.
- **Namespaces** are virtual clusters inside of the Kubernetes cluster to separate different products, projects or departments.

![Kubernetes Overview](images/k8s-overview.jpg)

---


## Dockerize your application

Dockerize your application means to **wrap your application, libraries and configuration** in a docker image that can be run later.

You can attach some configuration to your image but you still can modify that configuration with **environment variables** at run time.

You define the container image  with a **Dockerfile**. Dockerfile contains the instructions to build a docker image.

## Build your container images

Build your image for the web:

`cd src/web`

`docker build -t oke/web .`

Build your image for the server:

`cd src/server`

`docker build -t oke/server .`

Check that the images are created with:

`docker images | grep oke`

Can you see the **size** of the images? It is smaller than a full virtual machine image. That is really good news!

## Run your application locally

Run locally a container from your images:

`docker run -d --name server -p 3000:3000 --rm oke/server`

`docker run -d --name web -p 80:80 --rm oke/web`

## Test the applications

Server health 

`curl -s localhost:3000/health | jq .`

Web running on:
[localhost](http://localhost)


## Pull and push images

Registry is a repository of container images, tagged with a version or code name.

![OKE and OCIR](images/okeandocir.jpg)

Developers or CI tools can **push** images to the repository.

Kubernetes and developers can **pull** images to be run.

> Try it yourself!
> 
> Pull an image:
> `docker pull docker/whalesay`
> 
> Run the image:
> 
> `docker run --name whale --rm docker/whalesay cowsay "Say no to one-use plastic, hooman"`


Login with your Docker into OCI registry:

> You must have an Auth Token to use with Oracle Cloud Infrastructure Registry

`docker login -u <tenancy-name>/<email> fra.ocir.io`

List of regional names and codes for OCI registry:

|  Region   | Code  | Registry URL |
| :-------: | :---: | :----------: |
| Frankfurt |  fra  | fra.ocir.io  |
|  London   |  lhr  | lhr.ocir.io  |
|  Ashburn  |  iad  | iad.ocir.io  |
|  Phoenix  |  phx  | phx.ocir.io  |

_Full list of regions and codes [here](https://docs.cloud.oracle.com/iaas/Content/Registry/Concepts/registryprerequisites.htm#Availab)!_

When you create a Auth Token in `Identity > Users > <your-user> > Auth Token`, the passcode generated is the password prompted here.

> If your user is federated with Oracle Identity Cloud Service, use the following pattern for your username:
> 
> \<tenancy-name\>/oracleidentitycloudservice/\<email\>

Tag an image for OCI registry:

`docker tag docker/whalesay fra.ocir.io/<tenancy_name>/oke/whalesay:latest`

Push the tagged image to OCI registry:

`docker push fra.ocir.io/<tenancy_name>/oke/whalesay`

Let's try to tag and push our web and server:

- `docker tag oke/server fra.ocir.io/<tenancy_name>/oke/server:beta`

- `docker tag oke/web fra.ocir.io/<tenancy_name>/oke/web:beta`

Check images with `docker images | grep oke`

- `docker push fra.ocir.io/<tenancy_name>/oke/server`

- `docker push fra.ocir.io/<tenancy_name>/oke/web`

## Oracle Kubernetes Engine

Create Kubernetes Cluster: `Developer Services > Container Cluster (OKE)`

![OKE cluster creation](images/okeclustercreation.png)

Follow the steps of `Quick Start` and connect with Kubernetes Dashboard.

## Pull OCI Registry private images

Kubernetes has to pull images from OCI Registry, and for that has to authenticate against the registry.

We need to create a secret on our Kubernetes Cluster to do so:

`kubectl create secret docker-registry <secret-name> --docker-server=<region-code>.ocir.io --docker-username='<tenancy-namespace>/<oci-username>' --docker-password='<oci-auth-token>' --docker-email='<email-address>'`

- `<secret-name>`: any descriptive name you like
- `<region-code>.ocir.io`: OCI registry service URL, e.g. lon.ocir.io
- `<tenancy-namespace>/<oci-username>`: tenancy and username/email
- `<oci-auth-token>`: under Identity > User > your user, you can create a Auth Token that goes here
- `<email-address>`: your email

## Deploy your containers

The deployment files contains the specs of the deployment for web and server.

Create both deployments with this commands:

`kubectl apply -f ops/web.yml`

`kubectl apply -f ops/server.yml`

Check Kubernetes Dashboard to see deployments:

`kubectl proxy`

[Kubernetes Dashboard](http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/)


Clean up after:

`kubectl delete deployment web-deployment server-deployment`

`kubectl delete svc service web`

## Ingress controller

**TODO**
[Example: Setting Up an Ingress Controller on a Cluster](https://docs.cloud.oracle.com/iaas/Content/ContEng/Tasks/contengsettingupingresscontroller.htm)

## SSL at ingress controller level

Create self-signed certificate

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=nginxsvc/O=nginxsvc"`

Create secret for TLS

`kubectl create secret tls tls-secret --key tls.key --cert tls.crt`

**TODO**

## Upgrade your application

**TODO**
