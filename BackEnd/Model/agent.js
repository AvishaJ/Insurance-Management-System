const mongoose = require('mongoose');
const validatorPackage = require('validator')

const AgentRoleSchema = mongoose.Schema({
    fullName              :  {type:String ,required: true},
    agentCode             :  {type:String},
    credential            :  {type:mongoose.SchemaTypes.ObjectId,ref:"credential"},
    address               :  {type:String},
    emailId               :  {type: String, 
                        unique     : true, 
                        required   : [true, 'Email address is required'],
                        validate   : 
                        { 
                            validator :  validatorPackage.isEmail,
                            message   : 'Please provide a valid email',
                        }
                    },
    qualification         :  {type:String},
    role                  :  {type:String},
    commision             :  {type:[mongoose.SchemaTypes.ObjectId],ref:"angentCommision"},
    transaction           :  {type:[mongoose.SchemaTypes.ObjectId],ref:'angentCommisionWithdraw'},
    totalCommisionAmmount :  {type:Number},
    isActive              :  {type:Boolean},
},{
    timestamps            :   true
})

let AgentRoleModel = new mongoose.model('agentRole', AgentRoleSchema)
module.exports = AgentRoleModel;