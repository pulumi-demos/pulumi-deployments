# Pulumi SDKs
from pulumi import ResourceOptions, Output, export, get_organization, get_project, get_stack
from pulumi_pulumiservice import StackTag
from pulumi_azure_native import resources

# Components
from azure_aks import AksCluster, AksClusterArgs

# Local modules
import config

base_name = config.base_name

# Create an Azure Resource Group
resource_group = resources.ResourceGroup(f"{base_name}-rg")

cluster = AksCluster(base_name, AksClusterArgs(
    rg_name=resource_group.name,
    cluster_node_count=config.node_count,
    cluster_node_size=config.node_size,
    admin_username=config.admin_username,
    ssh_public_key=config.ssh_public_key
), opts=ResourceOptions())

stack_tag = StackTag("stack_tag",
    organization=get_organization(),
    project=get_project(),
    stack=get_stack(),
    name="Demo",
    value="Base AKS Infrastructure"
)

export("resource_group", resource_group.name)
export('kubeconfig', Output.secret(cluster.kubeconfig))

