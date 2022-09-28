const {DatabaseMongoose} = require('../repository/database')
class Query{
    constructor(customerName,title,message)
    {
        this.customerName =  customerName;
        this.title        =  title;
        this.message      =  message;
        this.reply        =  "";
    }

    static async createNewQuery(customerName,title,message){
        const db = new DatabaseMongoose();
        const newQuery = await db.insertOneQuery(
            new Query(customerName,title,message)
        );
        return [true,"Query Created"];
    }

    static async replytoQuery(reply,queryId){
        const db = new DatabaseMongoose();
        const findQueryId = await db.findOneQuery({_id:queryId});
        if(!findQueryId){
            return [false,"Query Not Find"];
        }
        await db.updateOneQuery(
            {_id:queryId},
            {$set:{reply:reply}}
        );
        return [true,"Replied"]
    }

    static async deleteQuery(queryId){
        const db = new DatabaseMongoose();
        const findQueryId = await db.findOneQuery({_id:queryId});
        if(!findQueryId){
            return [false,"Query Not Find"];
        }
        await db.deleteOneQuery({_id:queryId});
        return [true,"Query Deleted"];
    }
    
    static async allQuery()
    {
        const db = new DatabaseMongoose();
        const allQuery = await db.getAllQuery();
        return allQuery;
    }

    static async updateOneQuery(queryId,propertyToUpdate,value){
        const db = new DatabaseMongoose();
        const findQueryId = await db.findOneQuery({_id:queryId});
        if(!findQueryId){
            return [false,"Query Not Find"];
        }
        switch(propertyToUpdate){
            case "Title":
                await db.updateOneQuery(
                    {_id:queryId},
                    {$set:{title:value}}
                );
                return [true,"Updated"];
            
            case "Message":
                await db.updateOneQuery(
                    {_id:queryId},
                    {$set:{message:value}}
                );
                return [true,"Updated"];

            default: 
                return [false,"Not Updated"];
        }
    }
}

module.exports = Query;