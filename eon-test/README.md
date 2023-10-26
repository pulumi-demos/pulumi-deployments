# Introduction
Deploys Guestbook app and related containers on an K8s cluster deployed via another stack 
using Pulumi's YAML provider.

# Demo Overview
**NOTE** This demo uses the `K8sServiceDeployment` package generated in the multilanguage-packages folder. 

This demo highlights the following:
- YAML support: It is written in YAML.
- Multilanguage Packages: It uses a package generated from a multilanguage component written in Golang. 
- Multistack Architecture: Uses stack reference to a k8s base infrastructure stack and layers on a "Guestbook" application using multiple services deployed using the `K8sServiceDeployment` multilanguage package.

# Launch the base K8s infrastructure stack
This project can deploy on any K8s deployment.  
However, the setup assumes you will use `python/aws-eks-base-infra-py`.  
That said, any "k8s base infra" stack can be used (e.g. `cs/aws-cs-eks-base-infra-py` or `py/azure-aks-base-infra-py`).

# Setup
- `cd guestbook-app-yaml`
- `pulumi config set aws:region us-east-1`
- `pulumi stack init demo/dev` 
  - This stack (e.g. `dev`) needs to match the stack name for the base K8s stack.
- `pulumi config set org ORGANIZATION`
  - Where *ORGANIZATION* is the name of the org in which the base K8s stack is launched.
- `pulumi config set k8sProject aws-eks-base-infra-py`
  - You can use any of the "base infra" projects in this repo or any K8s project that deploys a K8s cluster and outputs `kubeconfig`.

# Launch and Use
## Prepare the GuestBook Service Project
The `guestbook-app` uses the `pulumi_k8s_servicedeployment` package plugin generated in the multilanguage-packages folder. Therefore you need to set up your environment to be able to use it. 
- Find the `demos/multilanguage-packages/pulumi-k8s-servicedeployment/Makefile` folder.
  - Note the package's version found in the `VERSION := x.y.z` line.
- Find the `demos/multilanguage-packages/pulumi-k8s-servicedeployment/bin` directory
  - Look at the gzip tarballs in there and note the path to the one for your machine.
  - If you don't see a tarball for your machine, see the `gen_provider_plugin` target in `Makefile` for the package.
- Install the package's plugin:
  ```bash
  pulumi plugin install resource k8s-servicedeployment v0.0.3 -f PACKAGE_TARBALL_NOTED_ABOVE
  ```
  NOTE: use the latest VERSION noted from the MAKEFILE as per the earlier step.

- OPTIONALLY: Instead of installing the plugin, you can do the following in a terminal window opened in the folder:
  - `export PATH=$PATH:<PKG_DIR>/bin`
    - Where <PKG_DIR> is the path to the `pulumi-k8s-servicedeployment` package noted above
    - This is done so the pulumi engine can find the package binary (aka plugin).

## Lauch the GuestBook Stack
```bash
pulumi up
```