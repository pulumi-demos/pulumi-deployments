# AWS (API Gateway) -> Lambda -> Event Bridge -> Lambda -> DynamoDB

The goal is to stand up an infrastructure that demonstrates the following use-case:

- I want to deploy the API Gateway in a separate project/stack.
- I want to stand up a couple of lambda functions, an event bridge bus and a DynamoDB.
- I want to connect lambda #1 to the API GW.
- Lambda #1 receieves requests from the API GW and forwards them to the EventBridge
- Lambda #2 is triggered by EventBridge and writes data to the DynamoDB.

# Folder Contents

- api-gateway: this is a Pulumi project to create an API gateway to which the lambda-eventbridge-dynamodb project connects. 
- lambda-eventbridge-dynamodb: this is the main project that stands up the system using the API GW created by the other project.

# How to Run

- Run `pulumi up` for the `api-gateway` stack and then for the `lambda-eventbrdige-dynamodb` stack.
  - NOTE: The current architecture assumes the same "base" stack name (e.g. `dev`, `prod`, etc).
- Click on the URLs output by the `lambda-eventbridge-dynamodb` stack:
  - Base REST API link to send GET requests
  - Link to DynamoDB to show backend received and stored the event.
