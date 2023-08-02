import * as pulumi from "@pulumi/pulumi";
import * as pulumiService from "@pulumi/pulumiservice";
import * as autodeploy from "@pulumi/auto-deploy";
import * as aws from "@pulumi/aws";
import { readFileSync } from "fs";

const config = new pulumi.Config()
const downstreamProject = config.require("downstreamProject")
const gwDesc = config.require("gwDescription") 

// Create a base string for naming.
const nameBase = `${pulumi.getProject()}-${pulumi.getStack()}`

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

// Create an autodeploy relationship to update downstream stacks automatically.
// const deploy = new autodeploy.AutoDeployer("auto-deployer", {
//   organization: org,
//   project: proj,
//   stack: stack,
//   downstreamRefs: [`${downstreamProject}/${stack}`]
// });

// Stack outputs  
export const apiGatewayId = apigw.id
export const apiGatewayName = apigw.name

// Generate stack readme in the Pulumi UI
export const readme = readFileSync("../README.md").toString();
