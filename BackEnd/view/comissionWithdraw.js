
const { DatabaseMongoose } = require("../repository/database");
const Agent = require("./agent");
class CommisionWithdraw{
    constructor(reqDate,agentName,bankDetails,withdrawAmount){
        this.reqDate = reqDate;
        this.agentName = agentName;
        this.withdrawDate = "";
        this.particulars  = "Pending";
        this.bankDetail = bankDetails;
        this.withdrawAmount = withdrawAmount;
        this.withdrawCheck = false;
    }

    static async reqWithdrawAmount(userName,bankDetails,withdrawAmount){
        const date = new Date();
        const db = new DatabaseMongoose();
        let [findAgent,isAgentExist] = await Agent.findAgent(userName);
        if(withdrawAmount>findAgent.totalCommisionAmmount){
            return [false,"You do not have this much Of Balance"];
        }
        const newCommisionWithdraw = await db.insertOneWithdrawReq(new CommisionWithdraw(date,
            userName,
            bankDetails,
            withdrawAmount,
        ));
        await db.updateOneAgent({_id:findAgent._id},{$push:{transaction:newCommisionWithdraw}});
        return [true,"req to Withdraw Amount Done"]
    }

    static async accptAmountWithDraw(userName,WithdrawReqId)
    {
        const db = new DatabaseMongoose();
        let [findAgent,isAgentExist] = await Agent.findAgent(userName);
        
        const findreqId = await db.findOneCommisionWithdraw({_id:WithdrawReqId});
        if(!findreqId){
            return [false,"WithDrawReqId not found"];
        }
        const withdaw = (findAgent.totalCommisionAmmount)-(findreqId.withdrawAmount);
        if(findreqId.withdrawAmount>findAgent.totalCommisionAmmount){
            return [false,"You do not have this much Of Balance"];
        }
        if(withdaw<0){
            await db.updateOneCommisionWithdraw({_id:WithdrawReqId},{$set:{particular:"Dont have this much Balance"}});
            return [false,"Decline WIthdrawn req"];
        }
        if(findreqId.withdrawCheck!=false){
            return [false,"Already Paid"]
        }
        const date = new Date();
        await db.updateOneCommisionWithdraw({_id:WithdrawReqId},{$set:{withdrawDate:date}});
        
        await db.updateOneCommisionWithdraw({_id:WithdrawReqId},{$set:{particular:"Paid"}});
        await db.updateOneCommisionWithdraw({_id:WithdrawReqId},{$set:{withdrawCheck:true}});
        await db.updateOneAgent({_id:findAgent._id},{$set:{totalCommisionAmmount:withdaw}});
        return [true,"Accpt the withdrawn req"]
    }
}


module.exports = CommisionWithdraw;