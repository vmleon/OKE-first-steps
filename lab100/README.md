# Lab 100: Set up

## Create a Linux intance

We want to create a linux machine so we have all the tools set up. That will keep your laptop clean and centralize the configuration in a single mache with a single porpose.

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

Drop your SSH public key and click create.

> If you don't have SSH private and public key. Follow the steps on this [guide](https://docs.cloud.oracle.com/en-us/iaas/Content/Compute/Tasks/managingkeypairs.htm).

![SSH](./images/11.png)

After few seconds the instance will be running, take note of the public IP, and read the usage intructions for extra information about this Oracle Cloud Developer Image.

![Linux details](./images/12.png)

Let's ssh into de machine:

Go to your terminal and type

> Windows users: use [Putty](https://www.putty.org/) to connect with SSH.

`ssh opc@<public_IP_address>`

Great, you just connected to your new linux machine in the cloud.

The next step will walk you through the configuration of the Oracle Cloud Infrastructure Command Line Interface (CLI). It is a tool to talk to Oracle Cloud and it will be handy to grab the Kubernetes Cluster configuration in the next Lab.

## Configure OCI CLI

Check you have OCI CLI with the following command:

`oci -v`

And it will return the version of the CLI tool. Mine says at this moment `2.6.11`.

> You can install it from scratch in your laptop, not required for the hans-on lab, with the [Quick start](https://docs.cloud.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm) guide.

Now it is time to configure OCI CLI so you can connect with your tenancy. All the steps are described [here](https://docs.cloud.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm#SettinguptheConfigFile).

First, let's take notes of some information we will need, like Tenancy identification.

![Tenancy details](./images/13.png)

Then, click in `copy` next to the OCID value. Take a note of the value as you will need it later.

![Copy OCID](./images/14.png)

Now, the same for the User identificator.

![Copy OCID](./images/15.png)

![Copy OCID](./images/16.png)

You will find the steps on the official documentation [here](https://docs.cloud.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm#Other).

## OCI CLI Configuration

Let's type on the terminal of your linux in the cloud:

`oci setup config`

It will prompt for some values:

- `Enter a location for your config [/home/opc/.oci/config]:` Type `[ENTER]`, the default value is good.
- `Enter a user OCID:` copy and paste your user identificator.
- `Enter a tenancy OCID:` copy and paste your tenancy identificator.
- `Enter a region (e.g. ap-mumbai-1, ap-seoul-1, ap-sydney-1, ap-tokyo-1, ca-toronto-1, eu-frankfurt-1, eu-zurich-1, sa-saopaulo-1, uk-london-1, us-ashburn-1, us-gov-ashburn-1, us-gov-chicago-1, us-gov-phoenix-1, us-langley-1, us-luke-1, us-phoenix-1):` enter the region you want, I will go for `uk-london-1` but you should use the region where you have created everything: VCN, linux instance, etc.
- `Do you want to generate a new RSA key pair? (If you decline you will be asked to supply the path to an existing key.) [Y/n]:` Type `[ENTER]`, the default value is good.
- `Enter a directory for your keys to be created [/home/opc/.oci]:` Type `[ENTER]`, the default value is good.
- `Enter a name for your key [oci_api_key]:` Type `[ENTER]`, the default value is good.
- `Enter a passphrase for your private key (empty for no passphrase):` Type `[ENTER]`, the default value is good.


We need the content of the file `oci_api_key_public.pem`. Let's upload that to your `User Settings`.

Go to your User Settings again:

![User Settings](./images/15.png)

Scroll to the bottom and click on `Add Public Key`:

![User Settings](./images/17.png)

On your linux terminal, copy the result of this command:

`cat /home/opc/.oci/oci_api_key_public.pem`

Paste the content on the text area as you can see here:

![Upload public key](./images/18.png)

Done! Make sure everything works with the following command, it should return the name of your tenancy.

`oci os ns get`

Congratulations, you are ready to next lab!

---

Next [Lab 200: Containers](../lab200/README.md)

[Go back Home](../README.md)