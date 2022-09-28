const { DatabaseMongoose } = require('../repository/database');
const Agent = require('./Agent');
const Customer = require('./Customer');
class Commision{
    constructor(insAccountNo,customerName,agentName,insSchema,commisionAmount){
        this.insuranceAccountNo = insAccountNo;
        this.customerName       = customerName;
        this.agentName          = agentName;
        this.insuranceSchema    = insSchema;
        this.commisionAmount    = commisionAmount;
    }

    static async addcommision(insAccountNo,userName,agentName,insSchema,commisionAmount){

        const db = new DatabaseMongoose();
        const newCommision = await db.insertOneCommision(new Commision(
            insAccountNo,
            userName,
            agentName,
            insSchema,
            commisionAmount
        ));
        let [dAgent,isAgentExist] = await Agent.findAgent(agentName);
        console.log(agentName);
        if(!isAgentExist)
        {
            return [false,"Agent not Found "];
        }
        await db.updateOneAgent({_id:dAgent._id},{$push:{commision:newCommision}});
        let isUpdated = await Agent.updateCommisionAmount(dAgent._id);
        if(!isUpdated)
        {
            return [false,"Commission Not Updated in Agent"]
        }
        return [true,"Commission Added to agent"]
    }
}

module.exports = Commision;