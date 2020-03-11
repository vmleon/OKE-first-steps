# Lab 400: Ingress controller

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