const mongoose = require('mongoose');
const CredentialSchema = mongoose.Schema({
    userName: { type: String },
    password: { type: String }
}, {
    timestamps: true
})

let CredentialModel = new mongoose.model('credential', CredentialSchema)

module.exports=CredentialModel;