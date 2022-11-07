import * as pulumi from "@pulumi/pulumi";
const config = new pulumi.Config();

export const petLength = config.getNumber("petLength") ?? 2