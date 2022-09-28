const mongoose = require("mongoose");
const CustomerRoleModel = require("../Model/customer");
const EmployeeRole = require("../Model/employee");
const CredentialModel = require("../Model/credential");
const AgentRoleModel = require("../Model/agent");
const StateModel = require("../Model/state");
const CitieModel = require("../Model/city");
const QueryModel = require("../Model/query");
const TypeModel = require("../Model/type");
const SchemeModel = require("../Model/scheme");
const PaymentModel = require("../Model/payment");
const PolicyModel = require("../Model/policies");
const PedeningPremiumModel = require("../Model/pendingPremium");
const TaxModel = require("../Model/taxSetting");
const SettingModel = require("../Model/setting");
const AngentCommisionModel = require("../Model/commision");
const ClaimModel = require("../Model/claims");
const CommisionClaimModel = require("../Model/commisionClaim");

class DatabaseMongoose {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect("mongodb://127.0.0.1:27017/insurance")
      .then(() => {
        console.log();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //insert
  async insertOneCustomer(user) {
    try {
      let newRecord = await CustomerRoleModel.create(user);
      return [newRecord, true];
    } catch (e) {
      return [e.message, false];
    }
  }
  async insertOneCred(cred) {
    try {
      let newRecord = await CredentialModel.create(cred);
      return [newRecord, true];
    } catch (e) {
      return [e.message, false];
    }
  }
  async insertOneEmployee(employee) {
    try {
      let newRecord = await EmployeeRole.create(employee);
      return [newRecord, true];
    } catch (e) {
      return [e.message, false];
    }
  }
  async insertOneAgent(agent) {
    try {
      let newRecord = await AgentRoleModel.create(agent);
      return [newRecord, true];
    } catch (e) {
      return [e.message, false];
    }
  }
  async insertOneState(state) {
    try {
      let newRecord = await StateModel.create(state);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOneCity(city) {
    try {
      let newRecord = await CitieModel.create(city);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOneInsuranceType(insuranceType) {
    try {
      console.log(insuranceType);
      let newRecord = await TypeModel
.create(insuranceType);
      return [newRecord, true];
    } catch (e) {
      return [e.message, false];
    }
  }
  async insertOneInsuranceScheme(insuranceScheme) {
    try {
      let newRecord = await SchemeModel.create(insuranceScheme);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOneQuery(query) {
    try {
      let newRecord = await QueryModel.create(query);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOnePolicy(policy) {
    try {
      let newRecord = await PolicyModel.create(policy);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOneinstallMentLeft(installLeft) {
    try {
      let newRecord = await PedeningPremiumModel.create(installLeft);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOnePolicyPayment(policyPayment) {
    try {
      let newRecord = await PaymentModel.create(policyPayment);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOneTaxPercentage(tax) {
    console.log(tax)
    try {
      let newRecord = await TaxModel.create(tax);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOneinsuranceSetting(percentage) {
    try {
      let newRecord = await SettingModel.create(percentage);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOneCommision(commision) {
    try {
      let newRecord = await AngentCommisionModel.create(commision);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOnePolicyClaim(commision) {
    try {
      let newRecord = await ClaimModel.create(commision);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async insertOneWithdrawReq(commision) {
    try {
      let newRecord = await CommisionClaimModel.create(commision);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }

  //find
  async findOneCustomer(user) {
    try {
      let newRecord = await CustomerRoleModel.findOne(user);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneCred(cred) {
    try {
      let newRecord = await CredentialModel.findOne(cred);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneEmployee(employee) {
    try {
      let newRecord = await EmployeeRole.findOne(employee);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneAgent(agent) {
    try {
      let newRecord = await AgentRoleModel.findOne(agent);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneState(state) {
    try {
      let newRecord = await StateModel.findOne(state);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneCity(city) {
    try {
      let newRecord = await CitieModel.findOne(city);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneInsuranceType(insuranceType) {
    try {
      let newRecord = await TypeModel
.findOne(insuranceType);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneInsuranceScheme(insuranceScheme) {
    try {
      let newRecord = await SchemeModel.findOne(insuranceScheme);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneQuery(query) {
    try {
      let newRecord = await QueryModel.findOne(query);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneinstallMentLeft(installLeft) {
    try {
      let newRecord = await PedeningPremiumModel.findOne(installLeft);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOnePolicy(policy) {
    try {
      let newRecord = await PolicyModel
        .findOne(policy)
        .populate("installmentLeft");
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOnetaxSetting() {
    try {
      let newRecord = await TaxModel.find();
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneinsuranceSetting() {
    try {
      let newRecord = await SettingModel.find();
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneCommision(comis) {
    try {
      let newRecord = await AngentCommisionModel.findOne(comis);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOnePolicyClaim(comis) {
    try {
      let newRecord = await ClaimModel.findOne(comis);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneCommisionWithdraw(comis) {
    try {
      let newRecord = await CommisionClaimModel.findOne(comis);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }

  //update
  async updateOneCustomer(user, update) {
    try {
      let newRecord = await CustomerRoleModel.updateOne(user, update);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async updateOneCred(cred, update) {
    try {
      let newRecord = await CredentialModel.updateOne(cred, update);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async updateOneEmployee(employee, update) {
    try {
      let newRecord = await EmployeeRole.updateOne(employee, update);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async updateOneAgent(agent, update) {
    try {
      let newRecord = await AgentRoleModel.updateOne(agent, update);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async updateOneState(state, update) {
    try {
      let newRecord = await StateModel.updateOne(state, update);
      return [newRecord, true];
    } catch (e) {
      return [e.message, false];
    }
  }
  async updateOneCity(city, update) {
    try {
      let newRecord = await CitieModel.updateOne(city, update);
      return [newRecord, true];
    } catch (e) {
      return [e.message, false];
    }
  }
  async updateOneInsuranceScheme(insuranceScheme, update) {
    try {
      let newRecord = await SchemeModel.updateOne(
        insuranceScheme,
        update
      );
      return [newRecord, true];
    } catch (e) {
      return [e.message, false];
    }
  }
  async updateOneInsuranceType(insuranceType, update) {
    try {
      let newRecord = await TypeModel
.updateOne(insuranceType, update);
      return [newRecord, true];
    } catch (e) {
      return [e.message, false];
    }
  }
  async updateOneQuery(query, update) {
    try {
      let newRecord = await QueryModel.updateOne(query, update);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async updateOneinstallMentLeft(installLeft, update) {
    try {
      let newRecord = await PedeningPremiumModel.updateOne(installLeft, update);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async updateOnetaxSetting(percentage, update) {
    try {
      let newRecord = await TaxModel.updateOne(percentage, update);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async updateOneinsuranceSetting(percentage, update) {
    try {
      let newRecord = await SettingModel.updateOne(percentage, update);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async updateOnePolicy(percentage, update) {
    try {
      let newRecord = await PolicyModel.updateOne(percentage, update);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async updateOnePolicyClaim(percentage, update) {
    try {
      let newRecord = await ClaimModel.updateOne(percentage, update);
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }
  async updateOneCommisionWithdraw(percentage, update) {
    try {
      let newRecord = await CommisionClaimModel.updateOne(
        percentage,
        update
      );
      return newRecord;
    } catch (e) {
      return e.message;
    }
  }

  //delete
  async deleteOneCred(cred) {
    try {
      let newRecord = await CredentialModel.deleteOne(cred);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async deleteOneQuery(query) {
    try {
      let newRecord = await QueryModel.deleteOne(query);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }

  //getall
  async getAllCustomers() {
    try {
      let record = await CustomerRoleModel
        .find()
        .populate("credential")
        .populate("policies")
        .populate("claimPolicy");
      return record;
    } catch (e) {
      console.log(e.message);
    }
  }
  async getAllEmployees() {
    try {
      let record = await EmployeeRole.find().populate("credential");
      return record;
    } catch (e) {
      console.log(e.message);
    }
  }
  async getAllAgent() {
    try {
      let record = await AgentRoleModel.find().populate("credential");
      return record;
    } catch (e) {
      console.log(e.message);
    }
  }
  async getAllState() {
    try {
      let record = await StateModel.find().populate("city");
      return record;
    } catch (e) {
      console.log(e.message);
    }
  }
  async getAllInsuranceType() {
    try {
      let record = await TypeModel
.find().populate("insuranceScheme");
      return record;
    } catch (e) {
      return e.message;
    }
  }
  async getAllQuery() {
    try {
      let record = await QueryModel.find();
      return record;
    } catch (e) {
      return e.message;
    }
  }
  async getAllPolicy() {
    try {
      let record = await PolicyModel.find().populate("installmentLeft");
      return record;
    } catch (e) {
      return e.message;
    }
  }
  async AgentgetCustomer(agentName) {
    try {
      let record = await CustomerRoleModel
        .find(agentName)
        .populate("policies")
        .populate("credential");
      return record;
    } catch (e) {
      return e.message;
    }
  }
  async getAgentAllTransaction(agentName) {
    try {
      let record = await AgentRoleModel.find(agentName).populate("transaction");
      return record;
    } catch (e) {
      return e.message;
    }
  }

  async getAllCommision() {
    try {
      let record = await AngentCommisionModel.find();
      return record;
    } catch (e) {
      return e.message;
    }
  }
  async getAllTransaction() {
    try {
      let record = await CommisionClaimModel.find();
      return record;
    } catch (e) {
      return e.message;
    }
  }
}

module.exports = { DatabaseMongoose };
