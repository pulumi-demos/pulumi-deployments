exports.handler =  async function(event, context) {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2))
    return {
        statusCode: 201,
        body: "Hello, World from Pulumi!"
    };
  }
