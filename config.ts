import * as pulumi from "@pulumi/pulumi";

const org = pulumi.getOrganization();
const project = pulumi.getProject();
const stack = pulumi.getStack();

const config = new pulumi.Config();

const gwProject = config.require("apiGwProject")
const gwStackName = `${org}/${gwProject}/${stack}`
const gwStackRef = new pulumi.StackReference(gwStackName)
export const apiGatewayId = gwStackRef.getOutput("apiGatewayId")

export const nameBase = config.get("nameBase") || `${project}-${stack}`
export const appName = config.get("appName") || `${stack}.EventProcessor`
export const apiGwStageName = `${nameBase}-${stack}`

export const readCapacity = config.getNumber("readCapacity")
export const writeCapacity = config.getNumber("writeCapacity")

export const baseTags = {
  "team": "platform",
  "env": stack
}
