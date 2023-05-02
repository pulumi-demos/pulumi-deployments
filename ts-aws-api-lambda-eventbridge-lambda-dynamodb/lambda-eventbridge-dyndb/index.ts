import * as pulumi from "@pulumi/pulumi";
import * as pulumiService from "@pulumi/pulumiservice";
import { readFileSync } from "fs";

import { apiGatewayId, apiGwStageName, appName, baseTags, nameBase, readCapacity, writeCapacity } from "./config";

import { Backend } from "./backend";
import { Bus } from "./bus"
import { Frontend } from "./frontend"
import { Monitor } from "./new-relic"

const backend = new Backend(nameBase, { 
  readCapacity: readCapacity,
  writeCapacity: writeCapacity,
  tags: baseTags, 
})

const bus = new Bus(nameBase, {
  reader: backend.reader, 
  appName: appName,
  tags: baseTags,
})

const frontend = bus.arn.apply(arn => new Frontend(nameBase, {
  busArn: arn, 
  appName: appName, 
  apiGwId: apiGatewayId,
  apiGwStageName: apiGwStageName,
  tags: baseTags, 
}))

const newRelicMonitor = new Monitor(nameBase, {uri: frontend.url})

const stackTag = new pulumiService.StackTag("stackTag", {
  name: "DeploymentsDemo",
  value: "LambdaEventBridgeDynamoDb",
  organization: pulumi.getOrganization(),
  project: pulumi.getProject(),
  stack: pulumi.getStack()
});

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
