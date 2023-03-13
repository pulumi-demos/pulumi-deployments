import * as pulumi from "@pulumi/pulumi";
import * as pulumiService from "@pulumi/pulumiservice";
import * as aws from "@pulumi/aws";

// Create a base string for naming.
const nameBase = `${pulumi.getProject()}-${pulumi.getStack()}`

// Set up an API Gateway
const apiGwName = `${nameBase}-apigw`
const apigw = new aws.apigatewayv2.Api(apiGwName, {
  name: apiGwName,
  protocolType: "HTTP",
});

const stackTag = new pulumiService.StackTag("stackTag", {
  name: "DeploymentsDemo",
  value: "ComplexStack",
  organization: pulumi.getOrganization(),
  project: pulumi.getProject(),
  stack: pulumi.getStack()
});

export const apiGatewayId = apigw.id
export const apiGatewayName = apigw.name
