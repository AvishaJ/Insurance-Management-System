const Agent = require('../../view/agent.js');
const Employee = require('../../view/employee');
const JWTPayload  = require('../../view/authentication');
const {DatabaseMongoose} = require('../../repository/database');

async function getAllCommision(req,resp){
    let newPayload = JWTPayload.isValidateToken(
        req, 
        resp, 
        req.cookies["mytoken"]
    );

    if(newPayload.role != "admin" && newPayload.role!="employee"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    const db = new DatabaseMongoose();
    const allCommission = await db.getAllCommision();
    const { limit, pageNumber } = req.body;
    if (allCommission.length == 0) {
        return resp.status(403).send("No Commision Exist");
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send([allCommission.slice(startIndex,endIndex),allCommission]);
    return;

}

async function getAllAgentCommision(req,resp){
    let agentName = req.params.agentName;
    let newPayload = JWTPayload.isValidateToken(
        req, 
        resp, 
        req.cookies["mytoken"]
    );

    if(newPayload.role != "agent"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    const [findAgent,isAgentExists] = await Agent.findAgent(agentName);
    if(!isAgentExists){
        return resp.status(403).send("AgentName not Exists");
    }
    const db = new DatabaseMongoose();
    const allCommission = await Agent.allCommission(agentName);
    const { limit, pageNumber } = req.body;
    if (allCommission.length == 0) {
        return resp.status(403).send("No Commision Exist");
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send([allCommission.slice(startIndex,endIndex),allCommission]);
    return;

}


module.exports = {getAllCommision,getAllAgentCommision};