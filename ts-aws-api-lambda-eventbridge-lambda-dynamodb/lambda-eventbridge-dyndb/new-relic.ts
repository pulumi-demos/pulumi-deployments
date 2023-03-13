import * as pulumi from "@pulumi/pulumi";
import { Input, Output } from "@pulumi/pulumi";
import * as newrelic from "@pulumi/newrelic";
import { accountId } from "@pulumi/newrelic/config";

interface MonitorArgs {
  uri: pulumi.Input<string>;
};

export class Monitor extends pulumi.ComponentResource {
  public readonly url: Output<string>;

  constructor(name: string, args: MonitorArgs, opts?: pulumi.ComponentResourceOptions) {
    super("custom:EventProcessor:Monitor", name, args, opts)

    // Assume no account info provided.
    this.url = pulumi.interpolate`*** No Monitor provided since New Relic account information is missing. ***`

    // Create a synthetic monitor in New Relic for the app if new relic creds are set up
    if (accountId) { 
      const monitor = new newrelic.synthetics.Monitor(`${name}-monitor`, {
        name: name,
        uri: args.uri,
        period: "EVERY_5_MINUTES",
        status: "ENABLED",
        type: "SIMPLE",
        locationsPublics: ["US_EAST_2"],
      })

      this.url = pulumi.interpolate`https://one.newrelic.com/synthetics-nerdlets/monitor-overview/${monitor.id}?account=${accountId}`
    }
  }
}
