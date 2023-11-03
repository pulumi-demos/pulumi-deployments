# Azure AKS Cluster

This example deploys an AKS Kubernetes cluster.

# Demo Overview

This demo highlights the following:
- Typescript support: It is written in Python.
  - Uses standard Python approach of breaking code out to different files.
- Uses programmatic secrets to encrypt the kubeconfig output.
- Can be used in conjunction with one of the guestbook project to demonstrate, among other things, stack references.

## Deploying the App

To deploy your infrastructure, follow the below steps.

## Deploying and running the program

1.  Install Typescript packages:

    ```
    $ npm i
    ```

1.  Create a new stack:

    ```
    $ pulumi stack select demo/dev
    ```

1.  Set the AWS region:

    ```
    $ pulumi config set azure-native:location CentralUS
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    ```

## Clean up

To clean up resources, run `pulumi destroy` and answer the confirmation question at the prompt.
