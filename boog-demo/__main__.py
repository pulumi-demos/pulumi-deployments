"""
Deploys:
- Network: VPC, Subnets, Security Groups
- DB Backend: MySQL RDS
- FrontEnd: WordPress in Fargate
"""

# Pulumi SDKs
import pulumi
import pulumi_random as random

# Components
from aws_network import Vpc, VpcArgs 
from aws_rds_backend import Db, DbArgs
from aws_ecs_frontend import WebService, WebServiceArgs

# Get config data
config = pulumi.Config()
service_name = config.get('service_name') or 'wp-example'
db_name=config.get('db_name') or 'lampdb'
db_user=config.get('db_user') or 'admin'

# Get secretified password from config and protect it going forward, or create one using the 'random' provider.
db_password=config.get_secret('db_password')
if not db_password:
    password=random.RandomPassword('db_password',
        length=16,
        special=False,
        )
    # Pulumi knows this provider is used to create a password and thus automatically protects it going forward.
    db_password=password.result

# Create an AWS VPC and subnets, etc
network=Vpc(f'{service_name}-net', VpcArgs())
subnet_ids=network.subnet_ids

# Create a backend DB instance
be=Db(f'{service_name}-be', DbArgs(
    db_name=db_name,
    db_user=db_user,
    db_password=db_password,
    # publicly_accessible=True,  # Uncomment this to override for testing
    subnet_ids=subnet_ids,
    security_group_ids=[network.rds_security_group.id]
))

fe=WebService(f'{service_name}-fe', WebServiceArgs(
    db_host=be.db.address,
    db_port='3306',
    db_name=be.db.name,
    db_user=be.db.username,
    db_password=be.db.password,
    vpc_id=network.vpc.id,
    subnet_ids=subnet_ids,
    security_group_ids=[network.fe_security_group.id]
))

web_url=pulumi.Output.concat('http://', fe.alb.dns_name)
pulumi.export('Web Service URL', web_url)
pulumi.export('ECS Cluster Name', fe.cluster.name)

pulumi.export('DB Endpoint', be.db.address)
pulumi.export('DB User Name', be.db.username)
pulumi.export('DB Password', be.db.password)
