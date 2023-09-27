import * as random from "@pulumi/random";
import { readFileSync } from "fs";
import { RandomComponent} from "./randomComponent";
import * as config from "./config";

const nameLength = config.petLength;
const namePrefix = config.petNamePrefix;
const nameSeparator = config.petNameSeparator;

const randomPet = new random.RandomPet("random-pet", {
  length: nameLength,
  prefix: namePrefix,
  separator: nameSeparator
});

export const petName = randomPet.id;

// const randomPet = new RandomComponent("petcomp", {
//   nameLength: nameLength,
//   namePrefix: namePrefix,
//   nameSeparator: nameSeparator,
// });

// export const petName = randomPet.petName;

// Generate stack readme in the Pulumi UI
export const readme = readFileSync("./README.md").toString();