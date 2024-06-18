import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker-build";

const image = new docker.Image("image", {
    context: {
        location: "app"
    },
    platforms: [
        docker.Platform.Linux_arm64
    ],
    push: false
})