import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

interface RandomComponentArgs {
    nameLength: pulumi.Input<number>;
    namePrefix: pulumi.Input<string>;
    nameSeparator: pulumi.Input<string> | undefined;
}

export class RandomComponent extends pulumi.ComponentResource {
    public readonly petName: pulumi.Output<string>;

    constructor(name: string, args: RandomComponentArgs, opts?: pulumi.ComponentResourceOptions) {
        super("example:random:RandomComponent", name, opts);

        // Create a random pet resource
        const randomPet = new random.RandomPet(`${name}-random-pet`, {
            length: args.nameLength,
            prefix: args.namePrefix,
            separator: args.nameSeparator,
        }, {
            parent: this,
            aliases: [{ parent: pulumi.rootStackResource, name: "random-pet" }],
        });

        this.petName = randomPet.id;
    }
}