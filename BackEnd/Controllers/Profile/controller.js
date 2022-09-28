const Agent = require("../../view/agent.js");
const JWTPayload = require("../../view/authentication.js");
const Customer = require("../../view/customer.js");
async function profileAgent(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "agent") {
    resp.status(401).send("please specify this role to admin");
    return;
  }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  const userName = req.params.userName;
  console.log(userName);
  const [findAgent, isAgentExist] = await Agent.findAgent(userName);
  if (!isAgentExist) {
    resp.status(403).send("Agent not Found");
    return;
  }
  resp.status(201).send(findAgent);
  return;
}

async function profileCustomer(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "customer") {
    resp.status(401).send("please specify this role to customer");
    return;
  }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  const userName = req.params.userName;
  const [findCustomer, isCustomerExist] = await Customer.findCustomer(userName);
  if (!isCustomerExist) {
    resp.status(403).send("Agent not Found");
    return;
  }
  resp.status(201).send(findCustomer);
  return;
}

module.exports = { profileAgent, profileCustomer };
