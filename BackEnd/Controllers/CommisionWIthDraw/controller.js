const JWTPayload = require("../../view/authentication.js");
const CommisionWithdraw = require("../../view/comissionWithdraw");
const Agent = require("../../view/agent");
const { DatabaseMongoose } = require('../../repository/database');
async function withDrawClaim(req,resp){
    const userName = req.params.userName;
    const newPayload = JWTPayload.isValidateToken(
        req,
        resp,
        req.cookies["mytoken"]
    );
    if (newPayload.role != "agent") {
        resp.status(401).send("Sorry,Only agent can Req WithDraw");
        return;
    }
    if (newPayload.isActive == false) {
        resp.status(401).send(`${newPayload.firstName} is Inactive`);
        return;
    }
    const [findCustomer,isCustomerExists] = await Agent.findAgent(userName);
    if(!isCustomerExists){
        resp.status(401).send("Agent Not Found");
        return;
    }
    if(findCustomer.credential != newPayload.userName){
        resp.status(401).send("please login with correct agentName")
        return;
    }
    const {bankDetails,withdrawAmount} = req.body;
    const [isrequested,msz] = await CommisionWithdraw.reqWithdrawAmount(userName,bankDetails,withdrawAmount);
    if(!isrequested)
    {
        resp.status(403).send(msz);
        return;
    }
    resp.status(201).send(msz);
    return;
}

async function accptWithDraw(req,resp){
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
    const {agentName,WithdrawReqId} = req.body;
    const [isrequested,msz] = await CommisionWithdraw.accptAmountWithDraw(agentName,WithdrawReqId);
    if(!isrequested)
    {
        resp.status(403).send(msz);
        return;
    }
    resp.status(201).send(msz);
    return;
}

async function allCommisionWithdraw(req,resp){
    const newPayload = JWTPayload.isValidateToken(
        req,
        resp,
        req.cookies["mytoken"]
      );
      if (newPayload.role != "admin" && newPayload.role!="employee") {
        resp.status(401).send("Sorry,you can't login");
        return;
      }
      if (newPayload.isActive == false) {
        resp.status(401).send(`${newPayload.firstName} is Inactive`);
        return;
      }
    const db = new DatabaseMongoose();
    let allTransactions = await db.getAllTransaction();
    const { limit, pageNumber } = req.body;
    if (allTransactions.length == 0) {
        return resp.status(403).send("No Transaction Exist");
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send([allTransactions.slice(startIndex,endIndex),allTransactions]);
    return;
}

async function allAgentCommisionWithdraw(req,resp){
    const agentName = req.params.agentName;
    const newPayload = JWTPayload.isValidateToken(
        req,
        resp,
        req.cookies["mytoken"]
      );
      if (newPayload.role != "agent") {
        resp.status(401).send("Sorry,you can't login");
        return;
      }
      if (newPayload.isActive == false) {
        resp.status(401).send(`${newPayload.firstName} is Inactive`);
        return;
      }

    let [dAgent,isAgentExist] = await Agent.findAgent(agentName);
    if(!isAgentExist)
    {
        return resp.status(403).send("AgentName not Exists");
    }
    if(newPayload.userName != dAgent.credential){
        return resp.status(401).send("Login with Correct UserName");
    }
    
    const db = new DatabaseMongoose();
    let allTransactions = await db.getAgentAllTransaction({_id:dAgent._id});
    const { limit, pageNumber } = req.body;
    if (allTransactions[0].transaction.length == 0) {
        return resp.status(403).send("No Transaction Exist");
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send([allTransactions[0].transaction.slice(startIndex,endIndex),allTransactions[0].transaction]);
    return;
}

module.exports = {withDrawClaim,accptWithDraw,allCommisionWithdraw,allAgentCommisionWithdraw};