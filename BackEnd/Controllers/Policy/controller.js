const Customer = require("../../view/customer.js");
const JWTPayload = require("../../view/authentication");
const Policies = require("../../view/policies");
const Employee = require("../../view/employee");
const Agent = require("../../view/agent");
const PolicyPayment = require("../../view/policyPayment.js");
const { DatabaseMongoose } = require("../../repository/database");
const PolicyClaim = require("../../view/policyWithdraw.js");

async function buyNewPolicy(req, resp) {
  const userName = req.params.userName;

  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "customer") {
    resp.status(401).send(`${newPayload.role} do not have any access`);
    return;
  }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  let [customer, isCustomerEsists] = await Customer.findCustomer(userName);
  if (!isCustomerEsists) {
    return resp.status(403).send("Customer not Exists");
  }
  const {
    insuranceType,
    insuranceScheme,
    termPlan,
    premiumType,
    totalAmount,
    paymentType,
    cardHolder,
    cardNumber,
    cvvNumber,
    expireDate,
  } = req.body;

  const [isPolicyExist, msz] = await Policies.addNewPolicy(
    userName,
    insuranceType,
    insuranceScheme,
    termPlan,
    premiumType,
    totalAmount,
    paymentType,
    cardHolder,
    cardNumber,
    cvvNumber,
    expireDate
  );
  if (!isPolicyExist) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function payInstallment(req, resp) {
  const userName = req.params.userName;

  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "customer") {
    resp.status(401).send(`${newPayload.role} do not have any access`);
    return;
  }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  let [customer, isCustomerEsists] = await Customer.findCustomer(userName);
  if (!isCustomerEsists) {
    return resp.status(403).send("Customer not Exists");
  }
  const {
    accountNo,
    insuranceScheme,
    installmentLeftId,
    paymentType,
    cardHolder,
    cardNumber,
    cvvNumber,
    expireDate,
  } = req.body;
  const [isPayment, msz] = await PolicyPayment.createPolicyPayment(
    userName,
    accountNo,
    insuranceScheme,
    installmentLeftId,
    paymentType,
    cardHolder,
    cardNumber,
    cvvNumber,
    expireDate
  );
  if (!isPayment) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function getAllPolicies(req, resp) {
  let userName = req.params.userName;
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "employee" && newPayload.role != "admin") {
    resp.status(401).send(`${newPayload.role} do not have any access`);
    return;
  }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  let [employee, isEmployeeEsists] = await Employee.findEmployee(userName);
  if (!isEmployeeEsists) {
    return resp.status(403).send("Employee not Exists");
  }
  const db = new DatabaseMongoose();
  let allPolicy = await db.getAllPolicy();
  if (allPolicy.length == 0) {
    resp.status(403).send("Policy not Exist");
    return;
  }
  const { limit, pageNumber } = req.body;
  let startIndex = (pageNumber - 1) * limit;
  let endIndex = pageNumber * limit;
  resp.status(201).send([allPolicy.slice(startIndex, endIndex), allPolicy]);
  return;
}

async function getAllInstallments(req, resp) {
  const userName = req.params.userName;
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  // if (
  //   newPayload.role != "customer" ||
  //   newPayload.role != "employee" ||
  //   newPayload.role != "admin"
  // ) {
  //   resp.status(401).send(`${newPayload.role} do not have any access`);
  //   return;
  // }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  let [findUser, isUserExist] = await Customer.findCustomer(userName);
  if (!isUserExist) {
    return resp.status(403).send("CustomerName not Exist");
  }
  const policyId = req.body.policyId;
  const [isPolicyExist, findPolicy] = await PolicyClaim.findUserPolicy(
    userName,
    policyId
  );
  if (!isPolicyExist) {
    return resp.status(403).send("Policy not Found");
  }
  let allLeftInstallments = findPolicy.installmentLeft;
  if (allLeftInstallments.length == 0) {
    resp.status(403).send("installments not Exist");
    return;
  }
  // const { limit, pageNumber } = req.body;
  // let startIndex = (pageNumber - 1) * limit;
  //let endIndex = pageNumber * limit;
  resp.status(201).send(allLeftInstallments);
  return;
}

async function getAmountDescription(req, resp) {
  const installmentLeftId = req.body.installmentLeftId;
  let description = await PolicyPayment.getTaxPenaltyInAmount(
    installmentLeftId
  );
  return resp.status(201).send(description);
}

module.exports = {
  buyNewPolicy,
  payInstallment,
  getAllPolicies,
  getAllInstallments,
  getAmountDescription,
};
