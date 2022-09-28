const { DatabaseMongoose } = require("../repository/database");
const Customer = require("./customer");
class PolicyClaim {
  constructor(
    customerName,
    reqDate,
    insuranceAccount,
    bankDetails,
    sumAssureAfterYears,
    insuranceScheme,
    policyId
  ) {
    this.reqDate = reqDate;
    this.customerName = customerName;
    this.insuranceAccount = insuranceAccount;
    this.insuranceScheme = insuranceScheme;
    this.sumAssureAfterYears = sumAssureAfterYears;
    this.withdrawDate = "";
    this.bankDetails = bankDetails;
    this.withdrawAmount = 0;
    this.policyId = policyId;
    this.withdrawCheck = false;
  }

  static async findUserPolicy(userName, policyId) {
    const db = new DatabaseMongoose();
    let [findUser, isUserExist] = await Customer.findCustomer(userName);
    for (let index = 0; index < findUser.policies.length; index++) {
      if (findUser.policies[index] == policyId) {
        let findPolicy = await db.findOnePolicy({ _id: policyId });
        return [true, findPolicy];
      }
    }
    return [false, null];
  }

  static async reqclaimPolicy(userName, policyId, bankDetails) {
    const date = new Date();

    const db = new DatabaseMongoose();
    let [findUser, isUserExist] = await Customer.findCustomer(userName);
    const [isPolicyExistinUser, findPolicy] = await PolicyClaim.findUserPolicy(
      userName,
      policyId
    );
    if (!isPolicyExistinUser) {
      return [false, "This policy not belongs to you"];
    }
    console.log(date);
    console.log(findPolicy.maturityDate);
    if (date < findPolicy.maturityDate) {
      return [false, "Your Policy maturity Date is not come yet"];
    }
    for (let index = 0; index < findPolicy.installmentLeft.length; index++) {
      if (findPolicy.installmentLeft[0].paymentStatus != "Paid") {
        return [false, "Your Policy cannot be Claimed before all Payment Done"];
      }
    }
    if (findPolicy.claim != false) {
      return [false, "Policy is already Claimed"];
    }
    const reqNewPolicy = await db.insertOnePolicyClaim(
      new PolicyClaim(
        userName,
        date,
        findPolicy.accountno,
        bankDetails,
        findPolicy.sumAssuredAfterYears,
        findPolicy.insuranceScheme,
        policyId
      )
    );

    await db.updateOneCustomer(
      { _id: findUser._id },
      { $push: { claimPolicy: reqNewPolicy } }
    );
    return [true, "req to claim Policy Done"];
  }

  static async accptClaimPolicy(policyClaimId) {
    const db = new DatabaseMongoose();
    let date = new Date().toISOString().slice(0, 10);
    const findpolicyClaimId = await db.findOnePolicyClaim({
      _id: policyClaimId,
    });
    if (!findpolicyClaimId) {
      return [false, "PolicyClaimId not found"];
    }
    const policy = await db.findOneinsuranceSetting();
    const findclaim = policy[0].claimDeduction / 100;
    const withdrawAmount = findpolicyClaimId.sumAssureAfterYears * findclaim;

    await db.updateOnePolicyClaim(
      { _id: policyClaimId },
      { $set: { withdrawAmount: withdrawAmount } }
    );
    await db.updateOnePolicyClaim(
      { _id: policyClaimId },
      { $set: { withdrawCheck: true } }
    );
    await db.updateOnePolicyClaim(
      { _id: policyClaimId },
      { $set: { withdrawDate: date } }
    );
    await db.updateOnePolicy(
      { _id: findpolicyClaimId.policyId },
      { claim: true }
    );
    return [true, "Transaction Done"];
  }
}

module.exports = PolicyClaim;
