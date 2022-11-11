import * as pulumi from "@pulumi/pulumi";
const config = new pulumi.Config();


export const petLength = config.getNumber("petLength") ?? 2

// Pulumi Deployments also lets you add pre-run code in the UI (unders the Settings->Deploy tab for the given stack).
// This bit here can be used to show that use-case by adding this code to the pre-run code:
// export PET_NAME_PREFIX=SOME_STRING_OF_YOUR_CHOOSING
// e.g. export PET_NAME_PREFIX=fido
export const petNamePrefix = process.env.PET_NAME_PREFIX

