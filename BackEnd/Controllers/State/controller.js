const State = require("../../view/state.js");
const JWTPayload = require("../../view/authentication.js");

async function createState(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "admin") {
    resp.status(401).send("please specify this role to admin");
    return;
  }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  const { stateName,isActive } = req.body;
  if(typeof(stateName) != "string")
  {
    return resp.status(403).send("Require stateName to Create New State");
  }
  if(typeof(isActive) != "boolean")
  {
    return resp.status(403).send("Require isActive field to Create New State");
  }
  const [isStateCreated, msz] = await State.createNewState(
    stateName,
    isActive
  );
  if (!isStateCreated) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function getAllState(req, resp) {
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );

  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  let allState = await State.allStates();
  if (allState.length == 0) {
    return resp.status(403).send("No State Exist");
  }
  resp.status(201).send(allState);
  return;
}

async function updateState(req, resp) {
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "admin" && newPayload.role != "employee") {
    resp.status(401).send(`${newPayload.role} do not have any access`);
    return;
  }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  const {StatetoUpdate,value } = req.body;
  if(typeof(StatetoUpdate) != "string")
  {
    return resp.status(403).send("Require StatetoUpdate to Update State");
  }
  if(typeof(value) != "string")
  {
    return resp.status(403).send("Require value to Update  State");
  }
  const [isUpdate, msz] = await State.update(
    StatetoUpdate,
    value
  );
  if (!isUpdate) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function deleteState(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "admin" && newPayload.role != "employee") {
    resp.status(401).send(`${newPayload.role} do not have any access`);
    return;
  }
  const stateName = req.body.stateName;
  if(typeof(stateName) != "string")
  {
    return resp.status(403).send("Require stateName to Delete State");
  }
  let [findState, isStateExist] = await State.findState(
    stateName
  );
  if (!isStateExist) {
    resp.status(403).send("State not Found");
    return;
  }
  findState.isActive == true
    ? (findState.isActive = false)
    : (findState.isActive = true);
  await State.updateStateActive(findState.isActive, findState._id);
  resp.status(201).send("Updated");
  return;
}

module.exports = {
  createState,
  getAllState,
  updateState,
  deleteState,
};
