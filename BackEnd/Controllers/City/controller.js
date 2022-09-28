const City = require("../../view/city.js");
const JWTPayload = require("../../view/authentication.js");

async function createCity(req, resp) {
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
  const  {stateName,cityName,isActive}  = req.body;
  if(typeof(cityName) != "string")
  {
    return resp.status(403).send("Require cityName to Create New City");
  }
  if(typeof(stateName) != "string")
  {
    return resp.status(403).send("Require stateName to Create New City");
  }
  if(typeof(isActive) != "boolean")
  {
    return resp.status(403).send("Require isActive field Create New City");
  }
  const [isCityCreated, msz] = await City.createNewCity(
    stateName,
    cityName,
    isActive
  );
  if (!isCityCreated) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function getAllCity(req, resp) {
  let newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );

  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  const stateName = req.body.stateName;
  if(typeof(stateName) != "string")
  {
    return resp.status(403).send("Require stateName to to Get all Cities");
  }
  let [allCity,allCitylength] = await City.allCities(stateName);
  if (allCitylength==false) {
    return resp.status(403).send("No City Exist");
  }
  resp.status(201).send(allCity);
  return;
}

async function updateCity(req, resp) {
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
  const {citytoUpdate,value } = req.body;
  if(typeof(citytoUpdate) != "string")
  {
    return resp.status(403).send("Require citytoUpdate to Update City");
  }
  if(typeof(value) != "string")
  {
    return resp.status(403).send("Require value to Update City");
  }
  const [isUpdate, msz] = await City.update(
    citytoUpdate,
    value
  );
  if (!isUpdate) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function deleteCity(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "admin" && newPayload.role != "employee") {
    resp.status(401).send(`${newPayload.role} do not have any access`);
    return;
  }
  const cityName = req.body.cityName;
  if(typeof(cityName) != "string")
  {
    return resp.status(403).send("Require cityName to Delete State");
  }
  let [findCity, isCityExist] = await City.findCityWState(
    cityName
  );
  if (!isCityExist) {
    resp.status(403).send("City not Found");
    return;
  }
  findCity.isActive == true
    ? (findCity.isActive = false)
    : (findCity.isActive = true);
  await City.updateCityActive(findCity.isActive, findCity._id);
  resp.status(201).send("Updated");
  return;
}

module.exports = {
  createCity,
  getAllCity,
  updateCity,
  deleteCity,
};
