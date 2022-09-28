const Customer = require("../../view/customer");
const Employee = require("../../view/employee");
const JWTPayload = require("../../view/authentication.js");
const Credentials = require("../../view/credential.js");
const bcrypt = require("bcrypt");
const Agent = require("../../view/agent");
async function login(req, resp) {
  const userName = req.body.userName;
  const password = req.body.password;

  let [dUser, isUsernameExist] = await Customer.findCustomer(userName);
  let [dEmplyee, isEmployeeNameExist] = await Employee.findEmployee(userName);
  let [dAgent, isAgentExist] = await Agent.findAgent(userName);

  if (!isUsernameExist && !isEmployeeNameExist && !isAgentExist) {
    resp.status(401).send("Invalid Credentials");
    return;
  }

  //Customer
  if (isUsernameExist) {
    if (dUser.isActive == false) {
      resp.status(401).send("User Not Found");
      return;
    }
    let [isuserNameExist, credExist] = await Credentials.findCredId(
      dUser.credential
    );
    if (!isuserNameExist) {
      resp.status(401).send("UserName Not Exist");
      return;
    }
    let isPassword = await bcrypt.compare(password, credExist.password);
    if (isPassword == false) {
      resp.status(401).send("Invalid Credentials");
      return;
    }
    const newPayload = new JWTPayload(dUser);
    const newToken = newPayload.createToken();
    resp.cookie("mytoken", newToken);
    resp.status(201).send(dUser);
    return;
  }

  //Employee
  if (isEmployeeNameExist) {
    if (dEmplyee.isActive == false) {
      resp.status(401).send("Employee Not Found");
      return;
    }
    let [isuserNameExist, credExist] = await Credentials.findCredId(
      dEmplyee.credential
    );
    if (!isuserNameExist) {
      resp.status(401).send("UserName Not Exist");
      return;
    }
    let isPassword = await bcrypt.compare(password, credExist.password);
    if (isPassword == false) {
      resp.status(401).send("Invalid Credentials");
      return;
    }
    const newPayload = new JWTPayload(dEmplyee);
    const newToken = newPayload.createToken();
    resp.cookie("mytoken", newToken);
    resp.status(201).send(dEmplyee);
    return;
  }

  //Agent
  if (isAgentExist) {
    if (dAgent.isActive == false) {
      resp.status(401).send("Agent Not Found");
      return;
    }
    let [isuserNameExist, credExist] = await Credentials.findCredId(
      dAgent.credential
    );
    if (!isuserNameExist) {
      resp.status(401).send("UserName Not Exist");
      return;
    }
    let isPassword = await bcrypt.compare(password, credExist.password);
    if (isPassword == false) {
      resp.status(401).send("Invalid Credentials");
      return;
    }
    const newPayload = new JWTPayload(dAgent);
    const newToken = newPayload.createToken();
    resp.cookie("mytoken", newToken);
    resp.status(201).send(dAgent);
    return;
  }
}

async function validCustomer(req, resp) {
  const userName = req.params.userName;
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );

  if (newPayload == false) {
    resp.status(401).send("Login require");
    return;
  }
  if (newPayload.role != "customer") {
    resp.status(401).send("Customer Login required");
    return;
  }
  let [dUser, isUsernameExist] = await Customer.findCustomer(userName);
  if (!isUsernameExist) {
    resp.status(401).send("User Not Found");
    return;
  }
  if (dUser.isActive == false) {
    resp.status(401).send("User Not Found");
    return;
  }
  if (newPayload.userName != dUser.credential) {
    return resp.status(401).send("Login with your Id");
  }
  resp.status(201).send("LoggedIN");
  return;
}
async function validAgent(req, resp) {
  const userName = req.params.userName;
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload == false) {
    resp.status(401).send("Login require");
    return;
  }

  if (newPayload.role != "agent") {
    resp.status(401).send("agent Login required");
    return;
  }
  let [dUser, isUsernameExist] = await Agent.findAgent(userName);
  if (!isUsernameExist) {
    resp.status(401).send("User Not Found");
    return;
  }
  if (dUser.isActive == false) {
    resp.status(401).send("User Not Found");
    return;
  }
  if (newPayload.userName != dUser.credential) {
    return resp.status(401).send("Login with your Id");
  }
  resp.status(201).send("LoggedIN");
  return;
}
async function validEmployee(req, resp) {
  const userName = req.params.userName;
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload == false) {
    resp.status(401).send("Login require");
    return;
  }

  if (newPayload.role != "employee") {
    resp.status(401).send("Employee Login required");
    return;
  }
  let [dUser, isUsernameExist] = await Employee.findEmployee(userName);
  if (!isUsernameExist) {
    resp.status(401).send("User Not Found");
    return;
  }
  if (dUser.isActive == false) {
    resp.status(401).send("User Not Found");
    return;
  }
  if (newPayload.userName != dUser.credential) {
    return resp.status(401).send("Login with your Id");
  }
  resp.status(201).send("LoggedIN");
  return;
}

async function validAdmin(req, resp) {
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  const userName = req.params.userName;
  if (newPayload.role != "admin") {
    resp.status(401).send("please specify this role to admin");
    return;
  }
  let [dUser, isUsernameExist] = await Employee.findEmployee(userName);
  if (!isUsernameExist) {
    resp.status(401).send("User Not Found");
    return;
  }
  if (dUser.isActive == false) {
    resp.status(401).send("User Not Found");
    return;
  }
  if (newPayload.userName != dUser.credential) {
    return resp.status(401).send("Login with your Id");
  }
  resp.status(201).send("LoggedIN");
  return;

  resp.status(201).send("LoggedIN");
  return;

  
}

module.exports = {
  login,
  validEmployee,
  validCustomer,
  validAgent,
  validAdmin,
};
