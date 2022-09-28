const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { DatabaseMongoose } = require('../repository/database');
class Credentials
{
    constructor(userName, password)
    {
        this.userName = userName;
        this.password = password;
    }

    async getHashPassword(){
        return bcrypt.hash(this.password,10);
    }

    static async finduserName(userName)
    {
        const db = new DatabaseMongoose();
        let credExist = await db.findOneCred({"userName":userName})
        if(credExist)
        {
            return [true,credExist];
        }
        return [false,-1];
    }

    static async findCredId(credId)
    {
        const db = new DatabaseMongoose();
        let credExist = await db.findOneCred({_id:credId});
        if(credExist)
        {
            return [true,credExist];
        }
        return [false,-1];
    }

    static async createCredential(userName, password)
    {
        const db = new DatabaseMongoose();
        let [isuserNameExist,credExist] = await  Credentials.finduserName(userName);
        if(isuserNameExist)
        {
            return [false,"userName Already Exist",null]
        }
        let newCredential = new Credentials(userName,password);
        newCredential.password = await newCredential.getHashPassword();
        return [true,"Credential Created",newCredential];
    }
}
module.exports = Credentials;