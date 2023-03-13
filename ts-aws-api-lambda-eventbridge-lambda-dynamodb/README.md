# AWS (API Gateway) -> Lambda -> Event Bridge -> Lambda -> DynamoDB

## Main Deployment Demo Notes

* Shows a case where you have stack references.
  * This isn't that interesting yet since the user is ultimately responsible for orchestrating the two stacks.
  * However, when https://github.com/pulumi/service-requests/issues/181 is addressed, this will be more interesting.
* Uses AWS OIDC to connect to AWS.
* Uses path filters to limit Deployments only to code changes in the folders applicable for the given stacks.

## Infrastructure Notes

The goal is to stand up an infrastructure that demonstrates the following use-case:

- I want to deploy the API Gateway in a separate project/stack.
- I want to stand up a couple of lambda functions, an event bridge bus and a DynamoDB.
- I want to connect lambda #1 to the API GW.
- Lambda #1 receieves requests from the API GW and forwards them to the EventBridge
- Lambda #2 is triggered by EventBridge and writes data to the DynamoDB.
- I want to spin up a new relic dashboard for the solution.
  - Note: Be sure to set new relic credentials in stack config or as environment variables.

# Folder Contents

- api-gateway: this is a Pulumi project to create an API gateway to which the lambda-eventbridge-dynamodb project connects. 
- lambda-eventbridge-dynamodb: this is the main project that stands up the system using the API GW created by the other project.

# How to Demo

Note: You can find the applicable projects/stacks in the Pulumi Service UI by searching in the Stacks view for `deployment`.

Note: The `deployment-lambda-eventbridge-dyndb` stack outputs some links to demonstrate the working infrastructure.


## Pulumi Service UI Focused Demo

* Go to the desired `deployment-api-gateway` stack and select Actions and run an action.
* Go to the desired `deployment-lambda-eventbridge-dyndb` stack (make sure it's the same as the api-gateway stack (e.g. `dev` or `prod`) and select Actions and run and action.

## Github/PR Based Demo

* In this repository, make a change to code in the `api-gateway` and/or `lambda-eventbridge-dyndb` folder(s) and push a branch named `dev`.
* In the Pulumi Service UI see the deployment(s) running for the applicable project(s).
* Create PR(s) to merge `dev` to `main`.
* In the Pulumi Sevice UI see the deployment(s) running for the applicable project(s) to run previews against the `prod` stack.
* Merge the PR(s).
* In the Pulumi Service UI see the deployment(s) running for the applicable project(s) to run updates for the `prod` stack.

