const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    payDate                 :  {type:Date},
    installmentAmount       :  {type:Number},
    taxAmount               :  {type:Number},
    penaltyfee              :  {type:Number},
    totalPayAmount          :  {type:Number},
    paymentType             :  {type:String},
    cardHolder              :  {type:String},
    cardNumber              :  {type:Number},
    cvvNumber               :  {type:Number},
    expireDate              :  {type:Date},
},{
    timestamps   :   true
})

let PaymentModel = new mongoose.model('payment', PaymentSchema)
module.exports = PaymentModel;