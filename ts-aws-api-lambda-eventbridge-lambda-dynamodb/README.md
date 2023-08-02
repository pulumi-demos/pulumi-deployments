# AWS (API Gateway) -> Lambda -> Event Bridge -> Lambda -> DynamoDB

This demo folder contains two projects:
- `api-gateway`: this is a Pulumi project to create an API gateway to which the lambda-eventbridge-dynamodb project connects. 
- `lambda-eventbridge-dynamodb`: this is the main project that stands up the system using the API GW created by the other project and where the bulk of the demo is run.

## Demos

Note: You can find the applicable projects/stacks in the Pulumi Service UI by searching in the Stacks view for `deployment`.

Note: The `deployment-lambda-eventbridge-dyndb` stack outputs some links to demonstrate the working infrastructure.

### Pulumi Service UI Focused Demo

* Go to the `deployment-api-gateway/prod` stack and select Actions and run an action.
* Go to the `deployment-lambda-eventbridge-dyndb/prod` stack and run an action.
* Be sure to destroy the stacks when done.

### Github/PR Based Demo

* Go to the repo: https://github.com/pulumi-demos/pulumi-deployments/tree/main/ts-aws-api-lambda-eventbridge-lambda-dynamodb 
* Go to the `lambda-eventbridge-dyndb` folder and make a change to the `dev` branch.
  * An easy change is to edit the `Pulumi.yaml` file and modify one of the config values.
* In the Pulumi Service UI see the deployment running for the `dev` stack in the `deployment-lambda-eventbridge-dyndb` project.
* Create a PR to merge `dev` to `main`.
* In the Pulumi Sevice UI see the deployment running for the `prod` stack to run previews against the `prod` stack.
* Merge the PR.
* In the Pulumi Service UI see the deployment running to update the `prod` stack. 
* Be sure to destroy the stacks when done.

### Multi-stack Orchestration
A successful update of the api-gateway stack will automatically trigger an update of the lambda-eventbridge stack.  
The update can occur via any of the mechanisms described above (i.e Pulumi Cloud UI or Github/PR flow)
An example flow is:

* Modify some config in the api-gateway `Pulumi.yaml` file.
* Push the change to the `dev` branch.
* This will trigger an update of the api-gateway Dev stack.
* Once complete, you should see an update of the lambda-eventbridge Dev stack.
* Creating and merging a PR to the `main` branch will then trigger an update of the api-gateway Prod stack followed by an update of the lambda-eventbridge Prod stack.

## More Information about the Repo and Projects

### Main Demo Points

* Shows a case where you have stack references and stack dependencies.
  * A successful update of the api-gateway stack triggers an update of the lambda-eventbridge stack
* Uses AWS OIDC to connect to AWS.
* Uses path filters to limit Deployments only to code changes in the folders applicable for the given stacks.

### Infrastructure Notes

The goal is to stand up an infrastructure that demonstrates the following use-case:

- I want to deploy the API Gateway in a separate project/stack.
- I want to stand up a couple of lambda functions, an event bridge bus and a DynamoDB.
- I want to connect lambda #1 to the API GW.
- Lambda #1 receieves requests from the API GW and forwards them to the EventBridge
- Lambda #2 is triggered by EventBridge and writes data to the DynamoDB.
- I want to spin up a new relic dashboard for the solution.
  - Note: Be sure to set new relic credentials in stack config or as environment variables.
