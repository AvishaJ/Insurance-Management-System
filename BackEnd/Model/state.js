const mongoose = require('mongoose');

const StateSchema = mongoose.Schema({
    stateName : {type:String},
    city      : {type:[mongoose.SchemaTypes.ObjectId],ref:"cities"},
    isActive  : {type:Boolean}
},{
    timestamps : true
})

let StateModel = new mongoose.model("state",StateSchema);
module.exports = StateModel;
