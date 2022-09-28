const InsuranceType = require("../../view/insuranceType");
const JWTPayload = require("../../view/authentication.js");

async function createInsuranceType(req, resp, image) {
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
  let {
    insuranceType,

    isActive,
  } = req.body;

  isActive == "true" ? (isActive = true) : (isActive = false);
  if (typeof insuranceType != "string") {
    return resp
      .status(403)
      .send("Require insuranceType to Create New InsuranceType");
  }
  // if(typeof(image) != "string")
  // {
  //   return resp.status(403).send("Require image to Create New InsuranceType");
  // }
  if (typeof isActive != "boolean") {
    return resp
      .status(403)
      .send("Require isActive field to Create New InsuranceType");
  }
  const [isInsTypeCreated, msz] = await InsuranceType.createInsuranceType(
    insuranceType,
    image,
    isActive
  );
  if (!isInsTypeCreated) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function getAllInsuranceType(req, resp) {
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );

  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  let allInsuranceType = await InsuranceType.allInsuranceType();
  if (allInsuranceType.length == 0) {
    return resp.status(403).send("No State Exist");
  }
  resp.json(allInsuranceType);
  return;
}

async function updateInsuranceType(req, resp) {
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
  const { insuranceTypetoUpdate, value } = req.body;
  if (typeof insuranceTypetoUpdate != "string") {
    return resp
      .status(403)
      .send("Require insuranceTypetoUpdate to Update Insurance Type");
  }

  const [isUpdate, msz] = await InsuranceType.updateInsuranceType(
    insuranceTypetoUpdate,
    value
  );
  if (!isUpdate) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function deleteInsuranceType(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "admin" && newPayload.role != "employee") {
    resp.status(401).send(`${newPayload.role} do not have any access`);
    return;
  }
  const insuranceType = req.body.insuranceType;
  if (typeof insuranceType != "string") {
    return resp
      .status(403)
      .send("Require insuranceType to Delete InsuranceType");
  }
  let [isInsuranceTypeExists, findInsuranceType] =
    await InsuranceType.findInsuranceType(insuranceType);
  if (!isInsuranceTypeExists) {
    resp.status(403).send("Insurance Type not Found");
    return;
  }
  findInsuranceType.isActive == true
    ? (findInsuranceType.isActive = false)
    : (findInsuranceType.isActive = true);
  await InsuranceType.updateActiveInsuranceType(
    findInsuranceType.isActive,
    findInsuranceType._id
  );
  resp.status(201).send("Updated");
  return;
}

module.exports = {
  createInsuranceType,
  getAllInsuranceType,
  updateInsuranceType,
  deleteInsuranceType,
};
