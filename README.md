# pulumi-deployments
Repo to hold code for demonstrating Pulumi Deployments features.

# Demos
Overview of possible demos are listed below.

Check the given folder's README for that example's specifics.

## Deploy from the Pulumi Service UI
* Go to given stack 
* Click the Actions button and select the type of action you want.

## Deploy from Git Push
* Modify something (e.g. modify a config value) for a given stack.
* Commit the change directly to the `main` branch.
  * This will run an update deployment.

## Pull Request Flow
* Modify something (e.g. modify a config value) for a given stack.
* Push the change as a branch.
  * Nothing will happen.
* Create a Pull Request.
  * This will run a `preview` deployment in the service.
* Merge the Pull Request to main.
  * This will run an `update` deployment in the service.