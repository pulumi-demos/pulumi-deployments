"""A Python Pulumi program"""

import pulumi
from pulumi_aws import (
    ec2,
    GetAmiFilterArgs
)

from pulumi_awsx import (
    ec2 as ec2x
)

config = pulumi.Config()
# retrieve an OPTIONAL value from configuration and provide a default, if none
instance_type = config.get("instance_type") or "t3.micro"

# retrieve a REQUIRED value from configuration (produces a runtime error)
instance_count = config.require_int("instance_count")

# create a static base_name to given our resources a common name
base_name = pulumi.get_project()

# making use of python's raw 'dict' type we can do things like create arbitrary tags
tags = {
    "Project": pulumi.get_project(),
    "Organization": pulumi.get_organization(),
    "Stack": pulumi.get_stack()
}

vpc = ec2x.Vpc(
    f"{base_name}_vpc",
    cidr_block="192.100.0.0/16",
    enable_dns_hostnames=True,
    enable_dns_support=True,
    tags=tags
)

ami = ec2.get_ami(
    most_recent=True,
    owners=["137112412989"],
    filters=[
        GetAmiFilterArgs(name="name", values=["amzn-ami-hvm-*"])
    ]
)

sg = ec2.SecurityGroup(
    f"{base_name}_sg",
    description="Enable HTTP and SSH access",
    vpc_id=vpc.vpc_id,
    ingress=[
        ec2.SecurityGroupIngressArgs(
            protocol="tcp",
            from_port=80,
            to_port=80,
            cidr_blocks=["0.0.0.0/0"]
        ),
        ec2.SecurityGroupIngressArgs(
            protocol="tcp",
            from_port=22,
            to_port=22,
            cidr_blocks=["0.0.0.0/0"]
        ),
    ],
    tags=tags
)

outputs = []
for i in range(instance_count):
    user_data = f"""
    #!/bin/bash
    echo "Hello, World from server #{i + 1}!" > index.html
    nohup python -m SimpleHTTPServer 80 &
    """

    instance = ec2.Instance(
        f"{base_name}-{i}",
        ami=ami.id,
        associate_public_ip_address=True,
        instance_type=instance_type,
        vpc_security_group_ids=[sg.id],
        subnet_id=vpc.public_subnet_ids.apply(lambda id: id[0]),
        user_data=user_data,
        tags=tags,
    )

    outputs.append({
        "id": instance.id,
        "ip": instance.public_ip,
    })

# export the relevant details for use in other places
pulumi.export("instances", outputs)