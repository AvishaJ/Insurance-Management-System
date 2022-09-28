const mongoose = require('mongoose');
const validatorPackage = require('validator')

const CustomerRoleSchema = mongoose.Schema({
    firstName       :  {type:String ,required: true},
    lastName        :  {type:String ,required: true},
    credential      :  {type: mongoose.SchemaTypes.ObjectId,ref:"credential"},
    dateOfBirth     :  {type:Date},
    age             :  {type:Number, min: [18, 'only above 18years is allowed']},
    address         :  {type:String},
    email           :  {type: String, 
                            unique     : true, 
                            required   : [true, 'email is required'],
                            validate   : 
                            { 
                                validator :  validatorPackage.isEmail,
                            }
                        },
    state           :  {type:String}, 
    city            :  {type:String}, 
    pincode         :  {type:Number}, 
    nominee         :  {type:String}, 
    nomineeRelation :  {type:String}, 
    policies        :  {type:[mongoose.SchemaTypes.ObjectId],ref:"policy"},
    claimPolicy     :  {type:[mongoose.SchemaTypes.ObjectId],ref:"claim"},
    agentrefer      :  {type:String},
    role            :  {type:String},
    isActive        :  {type:Boolean}
},{
    timestamps:true
})

let CustomerRoleModel = new mongoose.model('customerRole', CustomerRoleSchema)
module.exports = CustomerRoleModel;