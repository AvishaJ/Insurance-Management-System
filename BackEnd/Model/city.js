const mongoose = require('mongoose');

const CitieSchema = mongoose.Schema({
    cityName : {type:String},
    isActive : {type:Boolean}
},{
    timestamps:true
})

const CitieModel = new mongoose.model('cities', CitieSchema);
module.exports = CitieModel;