import * as pulumi from "@pulumi/pulumi";
import { Input, Output } from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

interface BackendArgs {
  readCapacity?: number;
  writeCapacity?: number;
  tags: aws.Tags
};


export class Backend extends pulumi.ComponentResource {
  public readonly reader: Output<string>
  public readonly eventsTableName: Output<string>

  constructor(name: string, args: BackendArgs, opts?: pulumi.ComponentResourceOptions) {
    super("custom:EventProcessor:Backend", name, args, opts);

    const nameBase = `${name}-be`

    // Get optional inputs if set
    const readCapacity = args.readCapacity ?? 10;
    const writeCapacity = args.writeCapacity ?? 5;

    // DynamoDB Table
    const eventsTable = new aws.dynamodb.Table(`${nameBase}-events-table`, {
      attributes: [{
        name: "timestamp",
        type: "N",
      }],
      hashKey: "timestamp",
      readCapacity: readCapacity, 
      writeCapacity: writeCapacity,
      tags: args.tags,
    }, {parent: this});

    // Backend Lambda Processor 
    const lambdaRole = new aws.iam.Role(`${nameBase}-lambdarole`, {
      assumeRolePolicy: {
       Version: "2012-10-17",
        Statement: [
          {
            Action: "sts:AssumeRole",
            Principal: {
              Service: [
                "lambda.amazonaws.com"
              ]
            },
            Effect: "Allow",
            Sid: "",
          },
        ],
      },
      tags: args.tags
    }, {parent: this});

    // Attach policies to the Lambda role created above
    const lambdaRoleAttachmentLambdaExecution = new aws.iam.RolePolicyAttachment(`${nameBase}-PolicyLambdaExecution`, {
      role: lambdaRole,
      policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
    }, {parent: this});
    const lambdaRoleAttachmentDynamoDB = new aws.iam.RolePolicyAttachment(`${nameBase}-PolicyDynamoDB`, {
      role: lambdaRole,
      policyArn: aws.iam.ManagedPolicy.AmazonDynamoDBFullAccess
    }, {parent: this});

    // Create the Lambda to execute
    const lambda = eventsTable.name.apply(name =>  {
      return new aws.lambda.Function(`${nameBase}-lambda`, {
        code: new pulumi.asset.AssetArchive({
          "infra_info.js": new pulumi.asset.StringAsset(`module.exports.infraInfo=
          {
            tableName: "${name}",
          }
          `),
          ".": new pulumi.asset.FileArchive("./be-lambda-app"),
        }),
        runtime: "nodejs16.x",
        role: lambdaRole.arn,
        handler: "index.handler",
        tags: args.tags
      }, {parent: this});
    })

    // Permissions to allow the eventbus to call the backend lambda
    const lambdaPermission = new aws.lambda.Permission(`${nameBase}-lambdaPermission`, {
      action: "lambda:InvokeFunction",
      principal: "events.amazonaws.com",
      function: lambda,
    }, {parent:this})

    this.reader = lambda.arn
    this.eventsTableName = eventsTable.name
    this.registerOutputs()
  }
}
