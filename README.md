# pulumi-deployments
Repo to hold code for demonstrating Pulumi Deployments features.

# Demos
Overview of possible demos are listed below.

Check the given folder's README for that example's specifics.

**WARNING WARNING WARNING**
To speed up the deployments, the stacks used for these deployment demos are REMOVED from the default policy group. 
Therefore, no policies are run against these deployments.  
A possible future to-do would be create a small policy pack and policy group for the deployment demo stacks to show it working.


## Deploy from the Pulumi Service UI
* Go to given stack 
* Click the Actions button and select the type of action you want.

## Deploy from Git Push
* Modify something (e.g. modify a config value in pulumi.yaml).
* Commit the change directly to the `main` branch.
  * This will run an update deployment against the `prod` stack.

## Pull Request Flow
* Modify something (e.g. modify a config value in pulumi.yaml).
* Push the change as `dev` branch.
  * This will run a deployment in the service on the `dev` stack.
* Create a Pull Request from `dev` to `main` branch.
  * This will run a `preview` deployment in the service on the `prod` stack.
* Merge the Pull Request to main.
  * This will run an `update` deployment in the service on the `prod` stack.
