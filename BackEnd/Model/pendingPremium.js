const mongoose = require('mongoose');

const PedeningPremiumSchema = mongoose.Schema({
    installmentNo          :  {type:Number},
    installmentDate        :  {type:Date},
    installAmount          :  {type:Number},
    payDate                :  {type:String},
    paymentStatus          :  {type:String},
    policyPayment          :  {type:String},
},{
    timestamps   :   true
})

let PedeningPremiumModel = new mongoose.model('pendingPremium', PedeningPremiumSchema)
module.exports = PedeningPremiumModel;