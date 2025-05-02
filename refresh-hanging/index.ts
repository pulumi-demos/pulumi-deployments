import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

const pw = new random.RandomPassword("password", {
    length: 21
})

console.log("refresh running")

export const password = pw.result;