const mongoose = require('mongoose');

const QuerySchema = mongoose.Schema({
    customerName   : {type:String},
    title          : {type:String},
    message        : {type:String},
    reply          : {type:String}
},{
    timestamps:true
})

const QueryModel = new mongoose.model('query', QuerySchema);
module.exports = QueryModel;