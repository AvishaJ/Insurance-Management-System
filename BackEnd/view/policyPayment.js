const { DatabaseMongoose } = require("../repository/database");

const Customer = require("./customer");
const Commision = require("./commision");
const TotalPayDescrip = require("./totalPayDescription");
class PolicyPayment {
  constructor(
    date,
    installmentAmount,
    penaltyfee,
    taxAmount,
    totalPayAmount,
    paymentType,
    cardHolder,
    cardNumber,
    cvvNumber,
    expireDate
  ) {
    this.payDate = date;
    this.installmentAmount = installmentAmount;
    this.taxAmount = taxAmount;
    this.penaltyfee = penaltyfee;
    this.totalPayAmount = totalPayAmount;
    this.paymentType = paymentType;
    this.cardHolder = cardHolder;
    this.cardNumber = cardNumber;
    this.cvvNumber = cvvNumber;
    this.expireDate = expireDate;
  }

  static async createPolicyPayment(
    userName,
    accountNo,
    insuranceScheme,
    installmentLeftId,
    paymentType,
    cardHolder,
    cardNumber,
    cvvNumber,
    expireDate
  ) {
    const date = new Date();
    const db = new DatabaseMongoose();
    const findinstallMent = await db.findOneinstallMentLeft({
      _id: installmentLeftId,
    });
    if (!findinstallMent) {
      return [false, "installmentLeftId not Exist"];
    }
    let findInsScheme = await db.findOneInsuranceScheme({
      insuranceScheme: insuranceScheme,
    });
    if (!findInsScheme) {
      return [false, "Insurance Scheme not found"];
    }
  
    if (findinstallMent.paymentStatus != "Pending") {
      return [false, "Payment Already Done"];
    }
    const installAmount = findinstallMent.installAmount;
    let commisionAmount = (findInsScheme.commissionInstall*installAmount) / 100;
    if (findinstallMent.installmentNo == 1) {
      commisionAmount = (findInsScheme.commissionNewReg*installAmount) / 100;
    }
    const findInsuranceSetting = await db.findOneinsuranceSetting();
    const penaltyper = findInsuranceSetting[0].penaltyPay;
    let penaltyfee = 0;
    if (findinstallMent.installmentDate < date) {
      penaltyfee = penaltyper * installAmount;
    }
    const findTax = await db.findOnetaxSetting();
    const taxper = findTax[0].taxpercentage / 100;

    const taxAmount = taxper * installAmount;
    const totalPayAmount = installAmount + taxAmount + penaltyfee;

    const policyPayment = await db.insertOnePolicyPayment(
      new PolicyPayment(
        date,
        installAmount,
        penaltyfee,
        taxAmount,
        totalPayAmount,
        paymentType,
        cardHolder,
        cardNumber,
        cvvNumber,
        expireDate
      )
    );

    await db.updateOneinstallMentLeft(
      { _id: installmentLeftId },
      { $set: { policyPayment: policyPayment._id } }
    );
    await db.updateOneinstallMentLeft(
      { _id: installmentLeftId },
      { $set: { paymentStatus: "Paid" } }
    );
    await db.updateOneinstallMentLeft(
      { _id: installmentLeftId },
      { $set: { payDate: date } }
    );
    let [dUser, isUserExist] = await Customer.findCustomer(userName);
    if (!isUserExist) {
      return [false, "Customer not Found "];
    }
    if (dUser.agentrefer == "") {
      return [true, "Payment Done"];
    }
    const [isCommisonExist, msz1] = await Commision.addcommision(
      accountNo,
      userName,
      dUser.agentrefer,
      insuranceScheme,
      commisionAmount
    );
    if (!isCommisonExist) {
      return [false, msz1];
    }
    return [true, "Payment Done"];
  }



  static async getTaxPenaltyInAmount(installmentLeftId){
    const db = new DatabaseMongoose();
    const date = new Date();
    const findinstallMent = await db.findOneinstallMentLeft({
      _id: installmentLeftId,
    });
    const installAmount = findinstallMent.installAmount;
    const findInsuranceSetting = await db.findOneinsuranceSetting();
    let penaltyper
    if(findInsuranceSetting==[]){
      penaltyper = 3
    }
    else{
      penaltyper = findInsuranceSetting[0].penaltyPay;
    }
    let penaltyfee = 0;
    if (findinstallMent.installmentDate < date) {
      penaltyfee = penaltyper * installAmount;
    }
    const findTax = await db.findOnetaxSetting();
    const taxper = findTax[0].taxpercentage / 100;

    const taxAmount = taxper * installAmount;
    const totalPayAmount = installAmount + taxAmount + penaltyfee;
    const newTotalPay = new TotalPayDescrip(installAmount,taxAmount,penaltyfee,totalPayAmount)
    return newTotalPay;
  }
}
module.exports = PolicyPayment;
