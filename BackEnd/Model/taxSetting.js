const mongoose = require('mongoose');

const TaxSchema = mongoose.Schema({
    taxpercentage          : {type:Number}
},{
    timestamps:true
})

const TaxModel = new mongoose.model('tax', TaxSchema);
module.exports = TaxModel;