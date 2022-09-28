const Agent = require('../../view/agent.js');
const Employee = require('../../view/employee');
const JWTPayload  = require('../../view/authentication');
const {DatabaseMongoose} = require('../../repository/database');
const bcrypt = require('bcrypt');

async function createAgent(req,resp)
{
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
    const {
        fullName,
        userName,
        password,
        address,
        emailId,
        qualification,
        role,
        isActive} = req.body;

    const [isAgentCreate,msz] = await Agent.createNewAgent(fullName,userName,password,address,emailId,qualification,role,isActive);
    if(!isAgentCreate){
        resp.status(403).send(msz);
        return ;
    }
    resp.status(201).send(msz);
    return;
}

async function getAllAgent(req,resp)
{
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
    const { limit, pageNumber } = req.body;
    let allAgents = await Agent.getAllAgents();
    if (allAgents.length == 0) {
        return resp.status(403).send("No Customer Exist");
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send([allAgents.slice(startIndex,endIndex),allAgents]);
    return;
}

async function noOfAgent(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin" && newPayload.role!="employee"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    let allAgents = await Agent.getAllAgents();
    resp.status(201).send(allAgents.length.toString());
    return;
}

async function updateAgent(req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "agent" && newPayload.role!="employee" && newPayload.role!="admin"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    let [employee,isEmployeeEsists] = await Employee.findEmployee(userName);
    let [agent,isAgentExists] = await Agent.findAgent(userName);

    //Employee Update Agent
    if(isEmployeeEsists){
        if(employee.credential != newPayload.userName){
            resp.status(401).send("please login with correct userName")
            return;
        }
        const {
            agentToUpdate,
            propertyToUpdate,
            value} = req.body;

        const [isUpdate,msz] =await Agent.updateAgent(agentToUpdate,propertyToUpdate,value);
        if(!isUpdate){
            resp.status(403).send(msz)
            return;
        }
        resp.status(201).send(msz);
        return;
    }
    //AgentUpdateHimself
    if(isAgentExists){
        if(agent.credential != newPayload.userName){
            resp.status(401).send("please login with correct userName")
            return;
        }
        let agenttoUpdate = userName;
        let {
            propertyToUpdate,
            value } = req.body;

        const [isUpdate,msz] =await Agent.updateAgent(agenttoUpdate,propertyToUpdate,value);
        if(!isUpdate){
            resp.status(403).send(msz)
            return;
        }
        resp.status(201).send(msz);
        return;
    }
    resp.status(401).send("Login with correct username");
    return;
}

async function deleteAgent(req,resp)
{
    let userName = req.params.userName;
    const newPayload = JWTPayload.isValidateToken(
        req,
        resp, 
        req.cookies["mytoken"]
    );

    if(newPayload.role != "admin" && newPayload.role!="employee"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    let [employee,isEmployeeEsists] = await Employee.findEmployee(userName);
    
    //Employee Delete Agent
    if(isEmployeeEsists){
        if(employee.credential != newPayload.userName){
            resp.status(401).send("please login with correct userName")
            return;
        }
        const AgentId = req.body.AgentId;
        let [Agentfind, isAgentIdExists] =await  Agent.findAgentId(AgentId);
        if(!isAgentIdExists)
        {
            resp.status(403).send("Agent not Found");
            return;
        }
        (Agentfind.isActive== true)? (Agentfind.isActive = false) : (Agentfind.isActive = true);
        await Agent.updateAgentActive(Agentfind.isActive,Agentfind._id);
        resp.status(201).send("Updated");
        return;
    }
    resp.status(403).send("User Not found");
//    Agent Delete Himself
//    if(isAgentExists){
//     if(agent.credential != newPayload.userName){
//            resp.status(401).send("please login with correct userName")
//            return;
//        }
//        const AgentId = req.body.AgentId;
//        let [Agentfind, isAgentIdExists] =await  Agent.findAgentId(AgentId);
//        if(!isAgentIdExists)
//        {
//            resp.status(403).send("Agent not Found");
//            return;
//        }
//        (Agentfind.isActive== true)? (Agentfind.isActive = false) : (Agentfind.isActive = true);
//        await Agent.updateAgentActive(Agentfind.isActive,Agentfind._id);
//        resp.status(201).send("Updated");
//        return;
//    }
}

async function getAllAgentrefer(req,resp)
{
    let userName = req.params.userName;
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
    let [findAgent,isAgentExists] = await Agent.findAgent(userName);
    if(!isAgentExists){
        return resp.status(403).send("AgentName not Found");
    }
    const { limit, pageNumber } = req.body;
    const db = new DatabaseMongoose();
    let allAgentsrefer = await db.AgentgetCustomer({agentrefer:userName}) ;
    if (allAgentsrefer.length == 0) {
        return resp.status(403).send("No Customer Exist");
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send([allAgentsrefer.slice(startIndex,endIndex),allAgentsrefer]);
    return;
}

module.exports = {
    createAgent,
    getAllAgent,
    noOfAgent,
    updateAgent,
    deleteAgent,
    getAllAgentrefer,
};