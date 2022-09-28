const Query = require("../../view/query");
const Customer = require("../../view/customer");
const JWTPayload = require("../../view/authentication.js");

async function createQuery(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "customer") {
    resp.status(401).send("Sorry,Only customer can Add Query");
    return;
  }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  const customerName = req.params.customerName;
  const [findCustomer, isCustomerExists] = await Customer.findCustomer(
    customerName
  );
  if (!isCustomerExists) {
    resp.status(401).send("Customer Not Found");
    return;
  }
  if (findCustomer.credential != newPayload.userName) {
    resp.status(401).send("please login with correct userName");
    return;
  }
  const { title, message } = req.body;
  if (typeof title != "string") {
    return resp.status(403).send("Require title to Add Query");
  }
  if (typeof message != "string") {
    return resp.status(403).send("Require message to Add Query");
  }
  const [isQuery, msz] = await Query.createNewQuery(
    customerName,
    title,
    message
  );
  resp.status(201).send(msz);
  return;
}

async function getAllQuery(req, resp) {
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );

  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  let allQuery = await Query.allQuery();
  if (allQuery.length == 0) {
    return resp.status(403).send("Not Find any Query");
  }
  resp.status(201).send(allQuery);
  return;
}

async function replytQuery(req, resp) {
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  // if (newPayload.role != "admin" || newPayload.role != "employee") {
  //   resp.status(401).send(`${newPayload.role} do not have any access`);
  //   return;
  // }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  const { reply, queryId } = req.body;
  if (typeof reply != "string") {
    return resp.status(403).send("Require reply to Reply Query");
  }
  if (typeof queryId != "string") {
    return resp.status(403).send("Require queryId to Reply Query");
  }
  const [isUpdate, msz] = await Query.replytoQuery(reply, queryId);
  if (!isUpdate) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function updateQuery(req, resp) {
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
  const customerName = req.params.customerName;
  const [findCustomer, isCustomerExists] = await Customer.findCustomer(
    customerName
  );
  if (!isCustomerExists) {
    resp.status(401).send("Customer Not Found");
    return;
  }
  if (findCustomer.credential != newPayload.userName) {
    resp.status(401).send("please login with correct userName");
    return;
  }
  const { queryId, propertyToUpdate, value } = req.body;
  if (typeof queryId != "string") {
    return resp.status(403).send("Require queryId to Update Query");
  }
  if (typeof propertyToUpdate != "string") {
    return resp.status(403).send("Require propertyToUpdate to Update Query");
  }
  if (typeof value != "string") {
    return resp.status(403).send("Require value to Update  Query");
  }
  const [isUpdate, msz] = await Query.updateOneQuery(
    queryId,
    propertyToUpdate,
    value
  );
  if (!isUpdate) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function deleteQuery(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "admin") {
    resp.status(401).send(`${newPayload.role} do not have any access`);
    return;
  }
  const queryId = req.body.queryId;
  if (typeof queryId != "string") {
    return resp.status(403).send("Require queryId to Delete Query");
  }
  const [isDeleted, msz] = await Query.deleteQuery(queryId);
  if (!isDeleted) {
    return resp.status(403).send(msz);
  }
  resp.status(201).send(msz);
  return;
}

module.exports = {
  createQuery,
  getAllQuery,
  replytQuery,
  updateQuery,
  deleteQuery,
};
