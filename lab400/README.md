# Lab 400: Work in progress

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

Follow the steps on the official documentation:

[Setting Up an Ingress Controller on a Cluster](https://docs.cloud.oracle.com/iaas/Content/ContEng/Tasks/contengsettingupingresscontroller.htm)

## SSL at ingress controller level

Create self-signed certificate

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=nginxsvc/O=nginxsvc"`

Create secret for TLS

`kubectl create secret tls tls-secret --key tls.key --cert tls.crt`

**Work in prgress**

## Upgrade your application

**Work in progress**

---

[Go back Home](../README.md)