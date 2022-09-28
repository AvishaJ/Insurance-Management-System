const Employee = require("../../view/employee");
const JWTPayload = require("../../view/authentication.js");
const Credentials = require("../../view/credential.js");

async function createAdmin() {
  await Employee.createAdmin("admin", "admin@123", "super", "user", true);
  return;
}

async function createEmployee(req, resp) {
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
  const { userName, password, firstName, lastName, role, isActive } = req.body;
  const [isEmployeCreated, msz] = await Employee.createNewEmployee(
    userName,
    password,
    firstName,
    lastName,
    role,
    isActive
  );
  if (!isEmployeCreated) {
    resp.status(403).send(msz);
    return;
  }
  resp.status(201).send(msz);
  return;
}

async function getAllEmployee(req, resp) {
  let newPayload = JWTPayload.isValidateToken(
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
  const { limit, pageNumber } = req.body;
  let allEmployee = await Employee.allEmployees();
  if (allEmployee.length == 0) {
    return resp.status(403).send("No user Exist");
  }
  let startIndex = (pageNumber - 1) * limit;
  let endIndex = pageNumber * limit;
  resp.status(201).send([allEmployee.slice(startIndex, endIndex), allEmployee]);
  return;
}

async function noOfEmployee(req, resp) {
  let newPayload = JWTPayload.isValidateToken(
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
  let allEmployee = await Employee.allEmployees();
  resp.status(201).send(allEmployee.length.toString());
  return;
}

async function updateEmployee(req, resp) {
  let userName = req.params.userName;
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
  let [employee, isEmployeeEsists] = await Employee.findEmployee(userName);
  if (employee.credential != newPayload.userName) {
    resp.status(401).send("please login with correct userName");
    return;
  }
  let { employetoUpdate, propertyToUpdate, value } = req.body;

  const [isUpdate, msz] = await Employee.update(
    employetoUpdate,
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

async function deleteEmployee(req, resp) {
  let userName = req.params.userName;
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  if (newPayload.role != "admin" && newPayload.role != "employee") {
    resp.status(401).send(`${newPayload.role} do not have any access`);
    return;
  }
  let [employee, isEmployeeEsists] = await Employee.findEmployee(userName);
  if (employee.credential != newPayload.userName) {
    resp.status(401).send("please login with correct userName");
    return;
  }
  const employeeId = req.body.employeeId;
  let [findEmployee, isemployeeIdExists] = await Employee.findEmployeeId(
    employeeId
  );
  if (!isemployeeIdExists) {
    resp.status(403).send("User not Found");
    return;
  }
  findEmployee.isActive == true
    ? (findEmployee.isActive = false)
    : (findEmployee.isActive = true);
  await Employee.updateEmployeeActive(findEmployee.isActive, findEmployee._id);
  resp.status(201).send("Updated");
  return;
}

async function profile(req, resp) {
  const newPayload = JWTPayload.isValidateToken(
    req,
    resp,
    req.cookies["mytoken"]
  );
  console.log(newPayload.role);
  if (newPayload.role == "agent" || newPayload.role == "customer") {
    resp.status(401).send("please specify this role to admin or employee");
    return;
  }
  if (newPayload.isActive == false) {
    resp.status(401).send(`${newPayload.firstName} is Inactive`);
    return;
  }
  const userName = req.params.userName;
  const [findEmployee, isEmployeeExist] = await Employee.findEmployee(userName);
  if (!isEmployeeExist) {
    resp.status(403).send("Employee not Found");
    return;
  }
  resp.status(201).send(findEmployee);
  return;
}

module.exports = {
  createAdmin,
  createEmployee,
  getAllEmployee,
  noOfEmployee,
  updateEmployee,
  deleteEmployee,
  profile,
};
