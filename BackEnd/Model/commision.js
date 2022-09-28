const mongoose = require('mongoose');

const AngentCommisionSchema = mongoose.Schema({
    insuranceAccountNo         :  {type:String},
    agentName                  :  {type:String},
    customerName               :  {type:String},
    insuranceSchema            :  {type:String},
    commisionAmount            :  {type:Number},
},{
    timestamps   :   true
})

let AngentCommisionModel = new mongoose.model('angentCommision', AngentCommisionSchema)
module.exports = AngentCommisionModel;

