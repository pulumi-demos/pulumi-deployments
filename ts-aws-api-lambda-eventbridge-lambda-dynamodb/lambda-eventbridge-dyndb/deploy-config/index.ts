import * as pulumi from "@pulumi/pulumi";
import * as pulumiservice from "@pulumi/pulumiservice";

const my_settings = new pulumiservice.DeploymentSettings("my_settings", {
    executorContext: {
        // executorImage: "pulumi/pulumi-nodejs",
        executorImage: "ghcr.io/meltano/pulumi:latest"
    },
    github: {
        deployCommits: true,
        paths: ["**/lambda-eventbridge-dyndb/**"],
        previewPullRequests: true,
        pullRequestTemplate: false,
        repository: "pulumi-demos/pulumi-deployments",
    },
    operationContext: {
        oidc: {
            aws: {
                roleARN: "arn:aws:iam::052848974346:role/pulumi-demo-org-deployments-oidc",
                sessionName: "pulumi-demo-deploy",
            },
        },
        options: {},
    },
    organization: "demo",
    project: "deployment-lambda-eventbridge-dyndb",
    sourceContext: {
        git: {
            branch: "refs/heads/mitch-repro",
            repoDir: "ts-aws-api-lambda-eventbridge-lambda-dynamodb/lambda-eventbridge-dyndb",
        },
    },
    stack: "repro",
});