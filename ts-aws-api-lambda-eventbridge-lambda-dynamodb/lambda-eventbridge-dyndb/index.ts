import * as pulumi from "@pulumi/pulumi";
import * as pulumiService from "@pulumi/pulumiservice";

import { apiGatewayId, apiGwStageName, appName, nameBase } from "./config";

import { Backend } from "./backend";
import { Bus } from "./bus"
import { Frontend } from "./frontend"
import { Dashboard } from "./new-relic"

const backend = new Backend(nameBase)

const bus = new Bus(nameBase, {reader: backend.reader, appName: appName})

const frontend = bus.arn.apply(arn => new Frontend(nameBase, {
  busArn: arn, 
  appName: appName, 
  apiGwId: apiGatewayId,
  apiGwStageName: apiGwStageName,
}))

const dashboard = new Dashboard(nameBase, {appName: appName})

const stackTag = new pulumiService.StackTag("stackTag", {
  name: "DeploymentsDemo",
  value: "ComplexStack",
  organization: pulumi.getOrganization(),
  project: pulumi.getProject(),
  stack: pulumi.getStack()
});

// The Frontend URL to hit that causes events
export const apiUrl = frontend.url

// DynamodDB console link to make it easier to demo/test.
const awsConfig = new pulumi.Config("aws");
const region = awsConfig.require("region");
export const EventsTableLink = pulumi.interpolate`https://console.aws.amazon.com/dynamodbv2/home?region=${region}#item-explorer?table=${backend.eventsTableName}`

// The URL for New Relic Dashboard
export const dashboardUrl = dashboard.url