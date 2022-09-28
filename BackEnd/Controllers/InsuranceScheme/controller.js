const InsuranceScheme = require("../../view/insuranceScheme.js");
const JWTPayload = require("../../view/authentication.js");

async function createInsuranceScheme(req, resp, image) {
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
    insuranceScheme,

    commissionNewReg,
    commissionInstall,
    insuranceNote,
    minTermPlan,
    maxTermPlan,
    minAge,
    maxAge,
    minInvestment,
    maxInvestment,
    profitRatio,
    isActive,
  } = req.body;
  isActive == "true" ? (isActive = true) : (isActive = false);
  commissionNewReg = parseInt(commissionNewReg);
  commissionInstall = parseInt(commissionInstall);
  minTermPlan = parseInt(minTermPlan);
  maxTermPlan = parseInt(maxTermPlan);
  minAge = parseInt(minAge);
  maxAge = parseInt(maxAge);
  minInvestment = parseInt(minInvestment);
  maxInvestment = parseInt(maxInvestment);
  profitRatio = parseInt(profitRatio);

  if (typeof insuranceType != "string") {
    return resp
      .status(403)
      .send("Require Insurance Type to Create New Insurance Scheme");
  }
  if (typeof insuranceScheme != "string") {
    return resp
      .status(403)
      .send("Require Insurance Scheme to Create New Insurance Scheme");
  }
  if (typeof image === null) {
    return resp
      .status(403)
      .send("Require image to Create New Insurance Scheme");
  }
  if (typeof commissionNewReg != "number") {
    return resp
      .status(403)
      .send("Require commissionNewReg Type to Create New Insurance Scheme");
  }
  if (typeof commissionInstall != "number") {
    return resp
      .status(403)
      .send("Require commissionInstall Type to Create New Insurance Scheme");
  }
  if (typeof insuranceNote != "string") {
    return resp
      .status(403)
      .send("Require insuranceNote to Create New Insurance Scheme");
  }
  if (typeof minTermPlan != "number") {
    return resp
      .status(403)
      .send("Require minTermPlan to Create New Insurance Scheme");
  }
  if (typeof maxTermPlan != "number") {
    return resp
      .status(403)
      .send("Require maxTermPlan to Create New Insurance Scheme");
  }
  if (typeof minAge != "number") {
    return resp
      .status(403)
      .send("Require minAge to Create New Insurance Scheme");
  }
  if (typeof maxAge != "number") {
    return resp
      .status(403)
      .send("Require maxAge to Create New Insurance Scheme");
  }
  if (typeof minInvestment != "number") {
    return resp
      .status(403)
      .send("Require minInvestment to Create New Insurance Scheme");
  }
  if (typeof maxInvestment != "number") {
    return resp
      .status(403)
      .send("Require maxInvestment to Create New Insurance Scheme");
  }
  if (typeof profitRatio != "number") {
    return resp
      .status(403)
      .send("Require profitRatio to Create New Insurance Scheme");
  }
  if (typeof isActive != "boolean") {
    return resp
      .status(403)
      .send("Require isActive field to Create New Insurance Scheme");
  }
  console.log(insuranceType);
  const [isInsuranceSchemeCreated, msz] =
    await InsuranceScheme.createNewInsuranceScheme(
      insuranceType,
      insuranceScheme,
      image,
      commissionNewReg,
      commissionInstall,
      insuranceNote,
      minTermPlan,
      maxTermPlan,
      minAge,
      maxAge,
      minInvestment,
      maxInvestment,
      profitRatio,
      isActive
    );
  if (!isInsuranceSchemeCreated) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function getAllInsuranceScheme(req, resp) {
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );

  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  const insuranceType = req.body.insuranceType;
  if (typeof insuranceType != "string") {
    return resp.status(403).send("Require insranceType to Get all Cities");
  }
  let [allInsuranceScheme, allInsuranceSchemelength] =
    await InsuranceScheme.allInsuranceScheme(insuranceType);
  if (allInsuranceSchemelength == false) {
    return resp.status(403).send("No InsuranceScheme Exist");
  }
  resp.status(201).send(allInsuranceScheme);
  return;
}

async function updateInsuranceScheme(req, resp) {
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
  const { schemetoUpdate, propertyToUpdate, value } = req.body;
  if (typeof schemetoUpdate != "string") {
    return resp
      .status(403)
      .send("Require schemetoUpdate to Update Insurance Scheme");
  }
  if (typeof propertyToUpdate != "string") {
    return resp
      .status(403)
      .send("Require propertyToUpdate to Update Insurance Scheme");
  }

  const [isUpdate, msz] = await InsuranceScheme.updateInsScheme(
    schemetoUpdate,
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

async function deleteInsuranceScheme(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "admin" && newPayload.role != "employee") {
    resp.status(401).send(`${newPayload.role} do not have any access`);
    return;
  }
  const insuranceScheme = req.body.insuranceScheme;
  if (typeof insuranceScheme != "string") {
    return resp
      .status(403)
      .send("Require insuranceScheme to Delete Insurance Scheme");
  }
  let [findInsScheme, isInsSchemeExist] =
    await InsuranceScheme.findInsSchemeWInsType(insuranceScheme);
  if (!isInsSchemeExist) {
    resp.status(403).send("Insurance Scheme not Found");
    return;
  }
  findInsScheme.isActive == true
    ? (findInsScheme.isActive = false)
    : (findInsScheme.isActive = true);
  await InsuranceScheme.updateInsSchemeActive(
    findInsScheme.isActive,
    findInsScheme._id
  );
  resp.status(201).send("Updated");
  return;
}

module.exports = {
  createInsuranceScheme,
  getAllInsuranceScheme,
  updateInsuranceScheme,
  deleteInsuranceScheme,
};
