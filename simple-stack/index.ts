import * as random from "@pulumi/random";

import * as config from "./config";

const nameLength = config.petLength
const namePrefix = config.petNamePrefix

const randomPet = new random.RandomPet("random-pet", {
  length: nameLength,
  prefix: namePrefix
});

export const petName = randomPet.id;
