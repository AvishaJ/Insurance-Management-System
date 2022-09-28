const {DatabaseMongoose} = require('../repository/database')
class InsuranceScheme{
    constructor(insuranceScheme,image,commissionNewReg,commissionInstall,insuranceNote,
        minTermPlan,maxTermPlan,minAge ,maxAge ,minInvestment,maxInvestment,profitRatio,isActive)
    {
        this.insuranceScheme   =  insuranceScheme;
        this.image             =  image; 

        //agent commision for new Customer Register by the agent
        this.commissionNewReg  =  commissionNewReg;

        //agent commision for installment paid by customer refered by agent
        this.commissionInstall =  commissionInstall;
        this.insuranceNote     =  insuranceNote;
        
        //Policy Term
        this.minTermPlan    =  minTermPlan;
        this.maxTermPlan    =  maxTermPlan;

        //Age Require For Insurance
        this.minAge         =  minAge;
        this.maxAge         =  maxAge;
        
        //Investment for Insurance
        this.minInvestment  =  minInvestment;
        this.maxInvestment  =  maxInvestment;

        this.profitRatio    =  profitRatio;

        this.isActive          =  isActive; 
    }

    static async createNewInsuranceScheme(
        insuranceType,
        insuranceScheme,
        image,
        commissionNewReg,
        commissionInstall,
        insuranceNote,
        minTermPlan,
        maxTermPlan,
        minAge ,
        maxAge ,
        minInvestment,
        maxInvestment,
        profitRatio,
        isActive
    ){
        const db = new DatabaseMongoose();
        const findInsType = await db.findOneInsuranceType(
            {"insuranceType":insuranceType}
        );
        if(!findInsType){
            return [false,"Insurane Type Not Exist"]
        }
        const [findScheme,isSchemeExists] = await InsuranceScheme.findInsScheme(
            insuranceType,insuranceScheme
        );
        if(isSchemeExists){
            return [false,`This Insurance Scheme already exist in Insurance Type :${insuranceType}`];
        }
        let newInsuranceScheme = await db.insertOneInsuranceScheme(new InsuranceScheme(
            insuranceScheme,
            image,
            commissionNewReg,
            commissionInstall,
            insuranceNote,
            minTermPlan,
            maxTermPlan,
            minAge ,
            maxAge ,
            minInvestment,
            maxInvestment,
            profitRatio,
            isActive
        ));
        await db.updateOneInsuranceType({_id:findInsType._id},{$push:{"insuranceScheme":newInsuranceScheme}})
        return [true,"Insurance Scheme Created SuccessFully"];
    }

    //find Insc Scheme with Insurance Type
    static async findInsScheme(insType,insScheme) {
        const db = new DatabaseMongoose();
        let findInsuranceType = await db.findOneInsuranceType({"insuranceType":insType});
        if (!findInsuranceType)
        {
            return [null,false];
        }
        if (findInsuranceType.isActive == false)
        {
            return [null,false];
        }
        for(let index=0; index<findInsuranceType.insuranceScheme.length; index++)
        {
            let indexOfInsuranceScheme = findInsuranceType.insuranceScheme[index];
            let findInsuranceScheme    = await db.findOneInsuranceScheme({"_id":indexOfInsuranceScheme});
            if (findInsuranceScheme.insuranceScheme == insScheme){
                return [findInsuranceScheme,true]
            }
        }
        return [null, false];
    }

    //find Insc Scheme without Insurance Type
    static async findInsSchemeWInsType(insuranceScheme){
        const db = new DatabaseMongoose();
        let findInsScheme = await db.findOneInsuranceScheme({"insuranceScheme":insuranceScheme});
        if(!findInsScheme)
        {
            return [null,false];
        }
        return [findInsScheme,true];
    }

    static async allInsuranceScheme(insType)
    {   
        const db = new DatabaseMongoose();
        let findInsuranceType = await db.findOneInsuranceType({"insuranceType":insType});
        if(!findInsuranceType)
        {
            return [null,false];
        }
        if(findInsuranceType.insuranceScheme.length == 0)
        {
            return [null,false];
        }
        const allInsuranceSchem = [];
        for(let index=0; index<findInsuranceType.insuranceScheme.length; index++)
        {
            let findInsuranceScheme  = await db.findOneInsuranceScheme(
                {"_id":findInsuranceType.insuranceScheme[index]}
            );
            allInsuranceSchem.push(findInsuranceScheme);
        }
        return [allInsuranceSchem,true];
    }

    static async updateInsSchemeActive(isactive, InsSchemeId) {
        const db = new DatabaseMongoose();
        await db.updateOneInsuranceScheme(
          { _id: InsSchemeId },
          { $set: { isActive: isactive } }
        );
        return;
    }

    static async updateInsScheme(schemetoUpdate,propertyToUpdate, value) {
        let [dScheme,isSchemeExist] = await InsuranceScheme.findInsSchemeWInsType(schemetoUpdate);
        if(!isSchemeExist)
        {
            return [false,"Insurance Scheme Not Found to Update"];
        }
        const db = new DatabaseMongoose();
        switch (propertyToUpdate) 
        {
            case "Insurance Scheme": 
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{insuranceScheme:value}}
                );
                return [true,"Updated"];

            case "Commission on New Regesteration in %":
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{commissionNewReg:value}}
                );
                return [true,"Updated"];

            case "Commission on per Installment in %":
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{commissionInstall:value}}
                );
                return [true,"Updated"];

            case "Insurance Note":
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{insuranceNote:value}}
                );
                return [true,"Updated"];

            case "Min Term Plan":
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{minTermPlan:value}}
                );
                return [true,"Updated"];

            case "Max Term Plan":
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{maxTermPlan:value}}
                );
                return [true,"Updated"];

            case "Min Age":
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{minAge:value}}
                );
                return [true,"Updated"];

            case "Max Age":
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{maxAge:value}}
                );
                return [true,"Updated"];

            case "Min Investment":
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{minInvestment:value}}
                );
                return [true,"Updated"];

            case "Max Investment":
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{maxInvestment:value}}
                );
                return [true,"Updated"];

            case "Profit Ratio":
                await db.updateOneInsuranceScheme(
                    {_id:dScheme._id},
                    {$set:{profitRatio:value}}
                );
                return [true,"Updated"];

            default: return [false,"Not Updated"];
        }
    }
}

module.exports = InsuranceScheme;