const mongoose = require("mongoose");
const validatorPackage = require("validator");

const EmployeeRoleSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    credential: { type: mongoose.SchemaTypes.ObjectId, ref: "credential" },
    role: { type: String },
    isActive: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

let EmployeeRoleModel = new mongoose.model("employeeRole", EmployeeRoleSchema);
module.exports = EmployeeRoleModel;
