const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  login,
  validEmployee,
  validCustomer,
  validAgent,
  validAdmin,
} = require("./Controllers/Login/controller");
const {
  createCustomer,
  getAllCustomer,
  noOfCustomer,
  updateCustomer,
  deleteCustomer,
  getMyAllPolicy,
} = require("./Controllers/Customer/controller.js");

const {
  createAdmin,
  createEmployee,
  getAllEmployee,
  noOfEmployee,
  updateEmployee,
  deleteEmployee,
  profile,
} = require("./Controllers/Employee/controller.js");

const {
  createAgent,
  getAllAgent,
  noOfAgent,
  updateAgent,
  deleteAgent,
  getAllAgentrefer,
} = require("./Controllers/Agent/controller.js");

const {
  createState,
  getAllState,
  updateState,
  deleteState,
} = require("./Controllers/State/controller.js");

const {
  createCity,
  getAllCity,
  updateCity,
  deleteCity,
} = require("./Controllers/City/controller.js");

const {
  createInsuranceType,
  getAllInsuranceType,
  updateInsuranceType,
  deleteInsuranceType,
} = require("./Controllers/InsuranceType/controller");

const {
  createInsuranceScheme,
  getAllInsuranceScheme,
  updateInsuranceScheme,
  deleteInsuranceScheme,
} = require("./Controllers/InsuranceScheme/controller");

const {
  createQuery,
  getAllQuery,
  replytQuery,
  updateQuery,
  deleteQuery,
} = require("./Controllers/Query/controller");

const { marketing } = require("./Controllers/Marketing/controller");

const {
  buyNewPolicy,
  payInstallment,
  getAllPolicies,
  getAllInstallments,
  getAmountDescription,
} = require("./Controllers/Policy/controller");

const { logout } = require("./Controllers/Logout/controller.js");

app.post("/api/v1/login", async (req, resp) => login(req, resp));

//Employee
app.post("/api/v1/createEmployee", async (req, resp) =>
  createEmployee(req, resp)
);
app.post("/api/v1/getAllEmployee", async (req, resp) =>
  getAllEmployee(req, resp)
);
app.get("/api/v1/numberOfEmployee", async (req, resp) =>
  noOfEmployee(req, resp)
);
app.put("/api/v1/updateEmployee/:userName", async (req, resp) =>
  updateEmployee(req, resp)
);
app.post("/api/v1/deleteEmployee/:userName", async (req, resp) =>
  deleteEmployee(req, resp)
);

//Customer
app.post("/api/v1/createCustomer", async (req, resp) =>
  createCustomer(req, resp)
);
app.post("/api/v1/getAllCustomer", async (req, resp) =>
  getAllCustomer(req, resp)
);
app.get("/api/v1/numberOfCustomer", async (req, resp) =>
  noOfCustomer(req, resp)
);
app.put("/api/v1/updateCustomer/:userName", async (req, resp) =>
  updateCustomer(req, resp)
);
app.post("/api/v1/deleteCustomer/:userName", async (req, resp) =>
  deleteCustomer(req, resp)
);

//Agent
app.post("/api/v1/createAgent", async (req, resp) => createAgent(req, resp));
app.post("/api/v1/getAllAgent", async (req, resp) => getAllAgent(req, resp));
app.get("/api/v1/numberOfAgent", async (req, resp) => noOfAgent(req, resp));
app.put("/api/v1/updateAgent/:userName", async (req, resp) =>
  updateAgent(req, resp)
);
app.post("/api/v1/deleteAgent/:userName", async (req, resp) =>
  deleteAgent(req, resp)
);
app.post("/api/v1/marketing", async (req, resp) => marketing(req, resp));

//State
app.post("/api/v1/createState", async (req, resp) => createState(req, resp));
app.get("/api/v1/getAllState", async (req, resp) => getAllState(req, resp));
app.put("/api/v1/updateState", async (req, resp) => updateState(req, resp));
app.post("/api/v1/deleteState", async (req, resp) => deleteState(req, resp));

//City
app.post("/api/v1/createCity", async (req, resp) => createCity(req, resp));
app.post("/api/v1/getAllCity", async (req, resp) => getAllCity(req, resp));
app.put("/api/v1/updateCity", async (req, resp) => updateCity(req, resp));
app.post("/api/v1/deleteCity", async (req, resp) => deleteCity(req, resp));

//Insurance Type
app.post(
  "/api/v1/createInsuranceType",
  upload.single("testImage"),
  async (req, resp) => {
    let image = fs.readFileSync("uploads/" + req.file.filename);
    createInsuranceType(req, resp, image);
  }
);
app.get("/api/v1/getAllInsuranceType", async (req, resp) =>
  getAllInsuranceType(req, resp)
);
app.put("/api/v1/updateInsuranceType", async (req, resp) =>
  updateInsuranceType(req, resp)
);
app.post("/api/v1/deleteInsuranceType", async (req, resp) =>
  deleteInsuranceType(req, resp)
);

//Insurance Scheme
app.post(
  "/api/v1/createInsuranceScheme",
  upload.single("testImage"),
  async (req, resp) => {
    let image = fs.readFileSync("uploads/" + req.file.filename);
    createInsuranceScheme(req, resp, image);
  }
);
app.post("/api/v1/getAllInsuranceScheme", async (req, resp) =>
  getAllInsuranceScheme(req, resp)
);
app.put("/api/v1/updateInsuranceScheme", async (req, resp) =>
  updateInsuranceScheme(req, resp)
);
app.post("/api/v1/deleteInsuranceScheme", async (req, resp) =>
  deleteInsuranceScheme(req, resp)
);

//Query
app.post("/api/v1/createQuery/:customerName", async (req, resp) =>
  createQuery(req, resp)
);
app.put("/api/v1/updateQuery/:customerName", async (req, resp) =>
  updateQuery(req, resp)
);
app.post("/api/v1/replytQuery", async (req, resp) => replytQuery(req, resp));
app.get("/api/v1/getAllQuery", async (req, resp) => getAllQuery(req, resp));
app.post("/api/v1/deleteQuery", async (req, resp) => deleteQuery(req, resp));

//Policy
app.post("/api/v1/buyPolicy/:userName", async (req, resp) =>
  buyNewPolicy(req, resp)
);
app.post("/api/v1/payInstallment/:userName", async (req, resp) =>
  payInstallment(req, resp)
);
app.post("/api/v1/getUserAllPolicy/:userName", async (req, resp) =>
  getMyAllPolicy(req, resp)
);
app.post("/api/v1/getAllPolicy/:userName", async (req, resp) =>
  getAllPolicies(req, resp)
);
app.post("/api/v1/getAllAgentRefer/:userName", async (req, resp) =>
  getAllAgentrefer(req, resp)
);
app.post("/api/v1/getAllInstallmentPolicy/:userName", async (req, resp) =>
  getAllInstallments(req, resp)
);


const {
  taxSetting,
  insuranceSetting,
  updatetaxSetting,
  updateinsuranceSetting,
  getTaxSetting,
} = require("./Controllers/Setting/controller");
const {
  getAllCommision,
  getAllAgentCommision,
} = require("./Controllers/Commision/controller");
const {
  reqClaim,
  accptClaim,
} = require("./Controllers/PolicyClaim/controller");
const {
  withDrawClaim,
  accptWithDraw,
  allCommisionWithdraw,
  allAgentCommisionWithdraw,
} = require("./Controllers/CommisionWIthDraw/controller");

//Setting
app.post("/api/v1/taxSetting", (req, resp) => taxSetting(req, resp));
app.post("/api/v1/insuranceSetting", (req, resp) =>
  insuranceSetting(req, resp)
);
app.post("/api/v1/updatetaxSetting", (req, resp) =>
  updatetaxSetting(req, resp)
);
app.post("/api/v1/updateinsuranceSetting", (req, resp) =>
  updateinsuranceSetting(req, resp)
);
app.get("/api/v1/gettaxper", async (req, resp) => getTaxSetting(req, resp));
app.post("/api/v1/getAmountDescrip", async (req, resp) =>
  getAmountDescription(req, resp)
);


const {
  profileAgent,
  profileCustomer,
} = require("./Controllers/Profile/controller");
//Profile
app.get("/api/v1/profile/:userName", async (req, resp) => profile(req, resp));
app.get("/api/v1/profileCustomer/:userName", async (req, resp) =>
  profileCustomer(req, resp)
);
app.get("/api/v1/profileAgent/:userName", async (req, resp) =>
  profileAgent(req, resp)
);

//Validation
app.post("/api/v1/isCustomerLogin/:userName", (req, resp) =>
  validCustomer(req, resp)
);
app.post("/api/v1/isAgentLogin/:userName", (req, resp) =>
  validAgent(req, resp)
);
app.post("/api/v1/isEmployeeLogin/:userName", (req, resp) =>
  validEmployee(req, resp)
);
app.post("/api/v1/isAdminLogin/:userName", (req, resp) => validAdmin(req, resp));

//logout
app.post("/api/v1/logout", (req, resp) => logout(req, resp));

app.listen(8082, async () => {
  await createAdmin();
  
  console.log("app is started at port 8082");
});
