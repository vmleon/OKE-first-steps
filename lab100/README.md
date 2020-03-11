# Lab 100: Set up

## Create a Linux intance

We want to create a linux machine so we have all the setups on it. That will keep your laptop clean and centralize the configuration in a single mache with a single porpose.

First of all we need a Virtual Cloud Network (VCN) that is the network fabric where all the rest of resources will live in.

![Create Virtual Cloud Network](./images/01.png)

![Networking Quickstart](./images/02.png)

![With Internet Connectivity](./images/03.png)

Select your own values for VCN name, compartment (root compartment is fine for testing).

![VCN creation details](./images/04.png)

Now we can jump to Home page and start creating the virtual machine. Remember to check you are happy with the region. I'm using UK South for the example.
![Create VM](./images/05.png)

Provide a name and change the base image to use.
![VM name and image](./images/06.png)

Select Oracle Cloud Developer Image
![VM image](./images/07.png)

I recommend to select a small shape as we don't need a powerful machine for this. Always free shape will do jut fine.
![VM shape](./images/08.png)

**VM.Standart.E2.1** is more than enough.
![VM Select shape](images/09.png)

Pick the VCN and subnet you created already
![VM Networking](images/10.png)

Drop your public key and click create.

> If you don't have SSH private and public key. Follow the steps on this [guide](https://docs.cloud.oracle.com/en-us/iaas/Content/Compute/Tasks/managingkeypairs.htm).

![SSH](./images/11.png)

After few seconds the instance will be running, take note of the public IP, and read the usage intructions for extra information about this Oracle Cloud Developer Image.

![Linux details](./images/12.png)

Let's ssh into de machine:

Go to your terminal and type
> Use Putty if you are Windows user.

`ssh opc@<public_IP_address>`

You connected to your new linux, check you have OCI CLI (Command Line Interface). CLI is a tool to talk to Oracle Cloud and it will be handy to grab the Kubernetes Cluster configuration in the next Lab.

## Configure OCI CLI

Check you have OCI CLI with the following command:

`oci -v`

And it will return the version of the CLI tool.

You can install it from scratch with the [Quick start](https://docs.cloud.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm) guide.

Now it is time to configure OCI CLI so you can connect with your tenancy. All the steps are described [here](https://docs.cloud.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm#SettinguptheConfigFile). The step is basically type `oci setup config` and answer the questions.

You will need Tenancy and User identificator, called OCID at Oracle Cloud. You can follow the guides to grab that information [here](https://docs.cloud.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm#Other).

You will need as well information about region and availability domain. Find the information [here](https://docs.cloud.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm).

Make sure everything works with the following command, it should return the name of your tenancy.

`oci os ns get`

Ready to next lab!

---

Next [Lab 200: Containers](../lab200/README.md)

[Go back Home](../README.md)