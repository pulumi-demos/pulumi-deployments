import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

for (let i: number = 0; i<=9; i++) {
    const pw = new random.RandomPassword(`password-${i}`, {
        length: 21
    })
}

console.log("running program")
