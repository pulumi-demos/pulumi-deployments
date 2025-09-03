import * as pulumiservice from "@pulumi/pulumiservice";

// Configure deployment settings for the dev stack
const deploymentSettings = new pulumiservice.DeploymentSettings("dev-deployment-settings", {
    organization: "demo",
    project: "deployment-lambda-eventbridge-dyndb",
    stack: "dev",
    
    // Configure the deployment to use the main branch with our updates
    sourceContext: {
        git: {
            repoUrl: "https://github.com/pulumi-demos/pulumi-deployments.git",
            branch: "refs/heads/main",
            repoDir: "",
        }
    },
    
    // Configure AWS OIDC for credentials
    oidc: {
        aws: {
            // This should be configured with the actual OIDC role ARN
            // For demo purposes, we'll assume there's already an OIDC setup
            roleArn: "arn:aws:iam::052848974346:role/pulumi-deployments-oidc-role",
            sessionName: "pulumi-deployment-session",
        }
    },
    
    // Alternatively, use ESC environment for credentials
    // environment: "demo/cloud-access/aws-oidc",
    
    // Deployment configuration
    autoDestroy: false,
    preRunCommands: [
        "npm install"
    ]
});

export const deploymentSettingsUrn = deploymentSettings.urn;