import * as pulumi from "@pulumi/pulumi";
import * as pulumiService from "@pulumi/pulumiservice";
import * as aws from "@pulumi/aws";
import { readFileSync } from "fs";

console.log('Hello world!');

const config = new pulumi.Config()
const nameBase = config.get("nameBase") || `${pulumi.getProject()}-${pulumi.getStack()}` 
const gwDesc = config.get("gwDescription") || "Deployment demo API GW"

// Set up an API Gateway
const apiGwName = `${nameBase}-apigw`
const apigw = new aws.apigatewayv2.Api(apiGwName, {
  name: apiGwName,
  protocolType: "HTTP",
  description: gwDesc,
});

// Gather up stack info
const org = pulumi.getOrganization()
const proj = pulumi.getProject()
const stack = pulumi.getStack()

// Create a stack tag to group related stacks together.
const stackTag = new pulumiService.StackTag("stackTag", {
  name: "DeploymentsDemo",
  value: "LambdaEventBridgeDynamoDb",
  organization: org,
  project: proj,
  stack: stack
});

// Stack outputs  
export const apiGatewayId = apigw.id
export const apiGatewayName = apigw.name

// Generate stack readme in the Pulumi UI
export const readme = readFileSync("../README.md").toString();
