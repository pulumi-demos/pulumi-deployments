import * as pulumi from "@pulumi/pulumi";

import * as random from "@pulumi/random";

const config = new pulumi.Config();
const petLength = config.getNumber("petLength") ?? 2;

const randomPet = new random.RandomPet("random-pet", {
  length: petLength
});

export const petName = randomPet.id;
