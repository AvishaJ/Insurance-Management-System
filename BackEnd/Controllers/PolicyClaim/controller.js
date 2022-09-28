const JWTPayload = require("../../view/authentication.js");
const PolicyClaim = require("../../view/policyWithdraw");
const Customer = require("../../view/customer");
async function reqClaim(req,resp){
    const userName = req.params.userName;
    const newPayload = JWTPayload.isValidateToken(
        req,
        resp,
        req.cookies["mytoken"]
    );
    if (newPayload.role != "customer") {
        resp.status(401).send("Sorry,Only customer can Req Claim");
        return;
    }
    if (newPayload.isActive == false) {
        resp.status(401).send(`${newPayload.firstName} is Inactive`);
        return;
    }
    const [findCustomer,isCustomerExists] = await Customer.findCustomer(userName);
    if(!isCustomerExists){
        resp.status(401).send("Customer Not Found");
        return;
    }
    if(findCustomer.credential != newPayload.userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    const {policyId,bankDetails} = req.body;
    const [isrequested,msz] = await PolicyClaim.reqclaimPolicy(userName,policyId,bankDetails);
    if(!isrequested)
    {
        resp.status(403).send(msz);
        return;
    }
    resp.status(201).send(msz);
    return;
}

async function accptClaim(req,resp){
    const newPayload = JWTPayload.isValidateToken(
        req,
        resp,
        req.cookies["mytoken"]
      );
      if (newPayload.role != "admin") {
        resp.status(401).send("Sorry,Only admin can Accpt Claim");
        return;
      }
      if (newPayload.isActive == false) {
        resp.status(401).send(`${newPayload.firstName} is Inactive`);
        return;
      }
    const {policyClaimId} = req.body;
    const [isrequested,msz] = await PolicyClaim.accptClaimPolicy(policyClaimId);
    if(!isrequested)
    {
        resp.status(403).send(msz);
        return;
    }
    resp.status(201).send(msz);
    return;
}

module.exports = {reqClaim,accptClaim};