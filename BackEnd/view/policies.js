const { DatabaseMongoose } = require("../repository/database");
const InstallmentLeft = require("./installLeft");
const PolicyPayment = require("./policyPayment");
const Customer = require("./customer");
const Commision = require("./commision");
let id = 0;
class Policies {
  constructor(
    createdate,
    insuranceType,
    insuranceScheme,
    maturityDate,
    termPlan,
    premiumType,
    profitRatio,
    totalAmount,
    sumAssuredAfterYears,
    installMentAmount,
    interestAmount,
    installmentLeft
  ) {
    this.dateCreated = createdate;
    this.accountno =  id++;
    this.insuranceType = insuranceType;
    this.insuranceScheme = insuranceScheme;
    this.maturityDate = maturityDate;
    this.termPlan = termPlan;
    this.premiumType = premiumType;
    this.profitRatio = profitRatio;
    this.totalAmount = totalAmount;
    this.sumAssuredAfterYears = sumAssuredAfterYears;
    this.installMentAmount = installMentAmount;
    this.interestAmount = interestAmount;
    this.installmentLeft = installmentLeft;
    this.claim = false;
  }

  static async addNewPolicy(
    userName,
    insuranceType,
    insuranceScheme,
    termPlan,
    premiumType,
    totalAmount,
    paymentType,
    cardHolder,
    cardNumber,
    cvvNumber,
    expireDate
  ) {
    const db = new DatabaseMongoose();
    let findInsScheme = await db.findOneInsuranceScheme({
      insuranceScheme: insuranceScheme,
    });
    if (!findInsScheme) {
      return [false, "Insurance Scheme not found"];
    }
    const profitRatio = findInsScheme.profitRatio;
    const createdate = new Date();
    const date = new Date(createdate.getTime());
    const maturityDate = new Date(
      date.setFullYear(date.getFullYear() + termPlan)
    );
    const interestAmount = totalAmount * (profitRatio / 100);
    const sumAssuredAfterYears = totalAmount + interestAmount;
    const installMentAmount = totalAmount / (termPlan / premiumType);
    const commisionAmount = findInsScheme.commissionNewReg / 100;

    const installmentDate = new Date(createdate.getTime());
    const installLeft = [];
    let installmentNo = 0;
    for (let index = 0; index < termPlan / premiumType; index++) {
      installmentNo++;
      let  installDate = new Date(
        installmentDate.setFullYear(installmentDate.getFullYear() + index)
      );
      let newPaymentPlan = new InstallmentLeft(
        installmentNo,
        installDate,
        installMentAmount
      );
      let newPayPlan = await db.insertOneinstallMentLeft(newPaymentPlan);
      installLeft.push(newPayPlan);
      installDate = new Date(
        installmentDate.setFullYear(installmentDate.getFullYear() - index)
      );
    }
    

    const newPolicy = await db.insertOnePolicy(
      new Policies(
        createdate,
        insuranceType,
        insuranceScheme,
        maturityDate,
        termPlan,
        premiumType,
        profitRatio,
        totalAmount,
        sumAssuredAfterYears,
        installMentAmount,
        interestAmount,
        installLeft
      )
    );
    let findCred = await db.findOneCred({userName:userName});
    await db.updateOneCustomer(
      { credential: findCred._id },
      { $push: { policies: newPolicy } }
    );
    const [isInstallmetLeftIdExists, installmentLeftId] =
      await Customer.findPayPolicy(newPolicy._id);
    if (!isInstallmetLeftIdExists) {
      return [false, "installmentLeft Id not Exists"];
    }
    const [isPaymentDone, msz, totalpay] = await PolicyPayment.createPolicyPayment(
      userName,
      newPolicy.accountno,
      insuranceScheme,
      installmentLeftId,
      paymentType,
      cardHolder,
      cardNumber,
      cvvNumber,
      expireDate
    );
    if (!isPaymentDone) {
      return [false, msz];
    }
    return [true, msz];
  }
}

module.exports = Policies;
