# Introduction
Deploys a set of EC2 webservers to AWS.

# Demo Overview

This demo highlights the following:
- Python support: It is written in python.
- Configuration: Makes use of both required and optional values sourced from Stack Configuration.
- Language Support: Makes use of a for-loop bound by a configuration values; this shows ability to easily control behavior without changing code.

# Prepare the Python Virtual Environment
```bash
    cd aws-webserver
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
```

# Setup
- `pulumi stack init demo/dev` 
- `pulumi config set aws:region us-east-1`
- `pulumi config set instance_count {integer}` // the amount of webserverse (ec2 instances) to be deployed
- OPTIONAL: `pulumi config set instance_type {string}` // defaults to t3.micro; any valid ec2 instance type will suffice

## Lauch the Webserver Stack
```bash
pulumi up
```
