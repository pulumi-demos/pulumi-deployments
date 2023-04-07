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

## More Information about the Repo and Projects

### Main Demo Points

* Shows a case where you have stack references.
  * This isn't that interesting yet since the user is ultimately responsible for orchestrating the two stacks.
  * However, when https://github.com/pulumi/service-requests/issues/181 is addressed, this will be more interesting.
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
