const mongoose = require('mongoose');

const SettingSchema = mongoose.Schema({
    claimDeduction          : {type:Number},
    penaltyPay              : {type:Number}
},{
    timestamps:true
})

const SettingModel = new mongoose.model('setting', SettingSchema);
module.exports =  SettingModel;