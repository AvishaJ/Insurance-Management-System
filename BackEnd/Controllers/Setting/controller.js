const TaxSetting = require("../../view/taxSetting");
const { DatabaseMongoose } = require("../../repository/database");
const JWTPayload = require("../../view/authentication.js");
const InsuranceSetting = require("../../view/insuranceSetting");

async function taxSetting(req, resp) {
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
  const db = new DatabaseMongoose();
  const newTax = await db.insertOneTaxPercentage(new TaxSetting(5));
  resp.status(201).send("Done");
}

async function insuranceSetting(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "admin") {
    resp.status(401).send("user is not permited");
    return;
  }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  const db = new DatabaseMongoose();
  const newTax = await db.insertOneinsuranceSetting(new InsuranceSetting());
  resp.status(201).send("Done");
}

async function updatetaxSetting(req, resp) {
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
  const value = req.body.value;
  const db = new DatabaseMongoose();
  const findTax = await db.findOnetaxSetting();
  if(findTax!=[]){
    const newTax = await db.insertOneTaxPercentage(new TaxSetting(value))
    if(newTax){
      resp.status(201).send(`tax rate updated to ${value}`);
      return
    }
    resp.status(401).send(`tax rate not updated`);
    return
  }
  await db.updateOnetaxSetting(
    { _id: findTax[0]._id },
    { $set: { taxpercentage: value } }
  );
  resp.status(201).send("Tax Percentage Updated");
}

async function updateinsuranceSetting(req, resp) {
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
  const { claimDeduction, penaltyPay } = req.body;
  const db = new DatabaseMongoose();
  const findInsuranceSetting = await db.findOneinsuranceSetting();
  
  let newTax
  if(!findInsuranceSetting[0]){
    newTax = await db.insertOneinsuranceSetting(new InsuranceSetting());  
    await db.updateOneinsuranceSetting(
      { _id: newTax._id },
      { $set: { claimDeduction: claimDeduction } }
    )
    await db.updateOneinsuranceSetting(
        { _id: newTax._id },
        { $set: { penaltyPay: penaltyPay } }
      );
  }
  else{
    await db.updateOneinsuranceSetting(
      { _id: findInsuranceSetting[0]._id },
      { $set: { claimDeduction: claimDeduction } }
    );
    await db.updateOneinsuranceSetting(
      { _id: findInsuranceSetting[0]._id },
      { $set: { penaltyPay: penaltyPay } }
    );
  }
  
  
  resp.status(201).send("Updated");
}

async function getTaxSetting(req, resp) {
  const db = new DatabaseMongoose();
  const findTax = await db.findOnetaxSetting();
  const per = findTax[0].taxpercentage;
  return resp.status(201).send(per.toString());
}

module.exports = {
  taxSetting,
  insuranceSetting,
  updatetaxSetting,
  updateinsuranceSetting,
  getTaxSetting,
};
