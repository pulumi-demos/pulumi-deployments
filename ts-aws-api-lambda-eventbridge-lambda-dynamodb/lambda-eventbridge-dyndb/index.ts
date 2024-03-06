import * as pulumi from "@pulumi/pulumi";
import * as pulumiService from "@pulumi/pulumiservice";
import { readFileSync } from "fs";
import * as aws from "@pulumi/aws"


// Simple typescript module to keep code more readable and maintainable
import { apiGatewayId, apiGwStageName, appName, baseTags, nameBase, readCapacity, writeCapacity } from "./config";

// Reusable component resources classes 
import { Backend } from "./backend";
import { Bus } from "./bus"
import { Frontend } from "./frontend"
import { Monitor } from "./new-relic"

// Deploy the "backend"
const backend = new Backend(nameBase, { 
  readCapacity: readCapacity,
  writeCapacity: writeCapacity,
  tags: baseTags, 
})

// Deploy the "bus"
const bus = new Bus(nameBase, {
  reader: backend.reader, 
  appName: appName,
  tags: baseTags,
})

// Deploy the "frontend"
const frontend = bus.arn.apply(arn => new Frontend(nameBase, {
  busArn: arn, 
  appName: appName, 
  apiGwId: apiGatewayId,
  apiGwStageName: apiGwStageName,
  tags: baseTags, 
}))

// Deploy a new relic monitor
const newRelicMonitor = new Monitor(nameBase, {uri: frontend.url})

// Add a Pulumi Cloud stack tag
const stackTag = new pulumiService.StackTag("stackTag", {
  name: "DeploymentsDemo",
  value: "LambdaEventBridgeDynamoDb",
  organization: pulumi.getOrganization(),
  project: pulumi.getProject(),
  stack: pulumi.getStack()
});

// Stack outputs ...

// The Frontend URL to hit that causes events
export const clickMeToCreateEvents = frontend.url

// DynamodDB console link to make it easier to demo/test.
const awsConfig = new pulumi.Config("aws");
const region = awsConfig.require("region");
export const clickMeToSeeDynamoDbItems = pulumi.interpolate`https://console.aws.amazon.com/dynamodbv2/home?region=${region}#item-explorer?table=${backend.eventsTableName}`

// The URL for New Relic Dashboard
export const newReliceMonitorUrl = newRelicMonitor.url

// Generate stack readme in the Pulumi UI
export const readme = readFileSync("../README.md").toString();
