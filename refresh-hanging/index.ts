import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

for (let i: number = 0; i<=10; i++) {
    const pw = new random.RandomPassword(`-${i}`, {
        length: 21
    })
}



