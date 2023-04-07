import * as random from "@pulumi/random";
import { readFileSync } from "fs";

import * as config from "./config";

const nameLength = config.petLength
const namePrefix = config.petNamePrefix
const nameSeparator = config.petNameSeparator

const randomPet = new random.RandomPet("random-pet", {
  length: nameLength,
  prefix: namePrefix,
  separator: nameSeparator
});

export const petName = randomPet.id;

// Generate stack readme in the Pulumi UI
export const readme = readFileSync("./README.md").toString();


