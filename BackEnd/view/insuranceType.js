const {DatabaseMongoose} = require('../repository/database')
class InsuranceType{
    constructor(insuranceType,image,isActive)
    {
        this.insuranceType    =  insuranceType;
        this.image            =  image;
        this.insuranceScheme  =  []
        this.isActive         =  isActive;
    }

    static async createInsuranceType(
        insuranceType,
        image,
        isActive
    ){
        const db = new DatabaseMongoose();
        const [isInsuranceExists,findInsuranceType] = await InsuranceType.findInsuranceType(insuranceType);
        if(isInsuranceExists)
        {
            return [false,"Insurance Type Already Exists"];
        }
        const [newInsuranceType,isInserted] = await db.insertOneInsuranceType(
            new InsuranceType(insuranceType,image,isActive)
        );
        if(!isInserted)
        {
            return [false,"Not Inserted"];
        }
        return [true,"New Insurance Type Inserted"]
    }

    static async findInsuranceType(insuranceType)
    {
        const db = new DatabaseMongoose();
        const findInsuranceType = await db.findOneInsuranceType({insuranceType:insuranceType});
        if(findInsuranceType)
        {
            return [true,findInsuranceType];
        }
        return[false,null]
    }

    static async allInsuranceType(){
        const db = new DatabaseMongoose();
        const allInsuranceType = await db.getAllInsuranceType();
        return allInsuranceType;
    }

    static async updateActiveInsuranceType(isactive,insuranceTypeId){
        const db = new DatabaseMongoose();
        await db.updateOneInsuranceType(
          { _id: insuranceTypeId },
          { $set: { isActive: isactive } }
        );
        return;
    }

    static async updateInsuranceType(InsuranceTypetoUpdate , value) {
        const db = new DatabaseMongoose();
        let [isInsuranceTypeExist , insuranceType] = await InsuranceType.findInsuranceType(InsuranceTypetoUpdate);
        if (!isInsuranceTypeExist) {
          return [false, "Not find the InsuranceType to Update"];
        }
        let [isInsuranceTypeNameExist, insuranceTypeName] = await InsuranceType.findInsuranceType(value);
        if (isInsuranceTypeNameExist) {
          return [false, "InsuranceTypeName is Already Exists Please mention other InsuranceTypeName"];
        }
        let [record,isUpdate] = await db.updateOneInsuranceType(
                                           {_id: insuranceType._id},
                                           { $set:{ insuranceType: value}}
                                        );
        if(!isUpdate){
            return [false,"Not Updated"];
        }
        return [true,"Updated"]
    }
}

module.exports = InsuranceType;