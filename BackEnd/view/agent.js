const Credentials = require('../view/credential')
const {DatabaseMongoose} = require('../repository/database');
const bcrypt = require("bcrypt");
let id =0;
class Agent{
    constructor(fullName,credential,address,emailId,qualification,role,isActive)
    {
        this.fullName              =  fullName;
        this.agentCode             =  "AGNT00"+(id++);
        this.credential            =  credential;
        this.address               =  address;
        this.emailId               =  emailId;
        this.qualification         =  qualification;
        this.role                  =  role;
        this.commision             =  [];
        this.transaction           =  [];
        this.totalCommisionAmmount =  0;
        this.isActive              =  isActive;
    }

    static async createNewAgent(
        fullName,
        userName,
        password,
        address,
        emailId,
        qualification,
        role,
        isActive
    ){
        const [flag,message,newCredential] = await Credentials.createCredential(
            userName,
            password
        );
        if(flag === false){
            return [false,"AgentName already Exists"]
        }
        const db = new DatabaseMongoose();
        const [dCredential, isCredCreated] = await db.insertOneCred(newCredential);
        const [record,isInserted] = await db.insertOneAgent(
            new Agent(fullName,dCredential._id,address,emailId,qualification,role,isActive)
        );
        if(!isInserted) {
            await db.deleteOneCred({"_id":dCredential._id});
            return [false,record];
        }
        return [true,"New Agent created"];
    }

    static async findAgent(userName)
    {
        const db = new DatabaseMongoose();
        const findCred = await db.findOneCred({"userName":userName});
        if(!findCred)
        {
            return [null,false];
        }
        const findAgent = await db.findOneAgent({"credential":findCred._id});
        if(findAgent)
        {
            return [findAgent,true];
        }
        return [null, false];
    }

    static async findAgentId(AgentId)
    {
        const db = new DatabaseMongoose();
        const findAgent = await db.findOneAgent({"_id":AgentId})
        if(findAgent)
        {
            return [findAgent,true];
        }
        return [null,false];
    }

    static async getAllAgents()
    {
        const db = new DatabaseMongoose();
        const allAgents = await db.getAllAgent();
        return allAgents;
    }

    static async allCommission(userName){
        let [dUser,isAgentExists] = await Agent.findAgent(userName);
        const db = new DatabaseMongoose();
        let allCommission = [];
        for(let index=0; index<dUser.commision.length; index++){
            let indii = dUser.commision[index];
            let findPolicy = await db.findOneCommision({_id:indii});
            allCommission.push(findPolicy);
        }
        return allCommission;
    }

    static async updateCommisionAmount(id)
    {
        const db = new DatabaseMongoose();
        const [findAgent,isAgentExists] = await Agent.findAgentId(id);
        if(!isAgentExists){
            return false;
        }
        let amount = 0;
        for(let index=0; index<findAgent.commision.length; index++){
            let indii = findAgent.commision[index];
            let findComission = await db.findOneCommision({_id:indii});
            amount += findComission.commisionAmount;
        }
        await db.updateOneAgent({_id:id},{$set:{totalCommisionAmmount:amount}});
        return true;
    }

    static async updateAgentActive(isactive,AgentId)
    {
        const db = new DatabaseMongoose();
        await db.updateOneAgent({_id:AgentId},{$set:{isActive:isactive}})
        return ;
    }

    static async updateAgent(userName, propertyToUpdate, value)
    {
        let [dUser,isUserExist] = await Agent.findAgent(userName);
        if(!isUserExist)
        {
            return [false,"Agent Not Found to Update"];
        }
        const db = new DatabaseMongoose();
        switch (propertyToUpdate) 
        {
            case "FullName": 
                await db.updateOneAgent(
                    {_id:dUser._id},
                    {$set:{fullName:value}}
                );
                return [true,"Updated"];

            case "UserName":
                let UserNameExist = await db.findOneCred({userName:value});
                if(UserNameExist)
                {
                    return [false,"UserName ALready Exists"];
                }
                await db.updateOneCred(
                    {_id:dUser.credential},
                    {$set:{userName:value}}
                ); 
                return [true,"Updated"];

            case "address":
                await db.updateOneAgent(
                    {_id:dUser._id},
                    {$set:{address:value}}
                );
                return [true,"Updated"];
                
            case "email":
                await db.updateOneAgent(
                    {_id:dUser._id},
                    {$set:{emailId:value}}
                );
                return [true,"Updated"];

            case "qualification":
                await db.updateOneAgent(
                    {_id:dUser._id},
                    {$set:{qualification:value}}
                );
                return [true,"Updated"];

            case "Password":
                await db.updateOneCred(
                  { _id: dUser.credential },
                  { $set: { password: await bcrypt.hash(value,10) }}                    
                );
                return [true, "Updated"];

            default: return [false,"Not Updated"];
        }
    }
}

module.exports = Agent;