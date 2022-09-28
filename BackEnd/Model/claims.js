const mongoose = require('mongoose');

const ClaimSchema = mongoose.Schema({
    reqDate                 :  {type:Date},
    customerName            :  {type:String},
    insuranceAccount        :  {type:String},
    insuranceScheme         :  {type:String},
    withdrawDate            :  {type: Date},
    bankDetails             :  {type:Number},
    sumAssureAfterYears     :  {type:Number},
    withdrawAmount          :  {type:Number},
    policyId                :  {type:String},
    withdrawCheck           :  {type:Boolean},

},{
    timestamps   :   true
})

let ClaimModel = new mongoose.model('claim', ClaimSchema)
module.exports = ClaimModel;