const Credentials = require('./credential');
const {DatabaseMongoose} = require('../repository/database')
const bcrypt = require("bcrypt");
class Customer
{
    constructor(firstName,lastName,credential,dob,age,address,email,role,state,city,pincode,nominee,nomineeRelation,agentName)
    {
        this.firstName         =    firstName;
        this.lastName          =    lastName;
        this.credential        =    credential;
        this.dateOfBirth       =    dob;
        this.age               =    age;
        this.address           =    address;
        this.email             =    email;
        this.role              =    role;
        this.state             =    state;
        this.city              =    city;
        this.pincode           =    pincode;
        this.nominee           =    nominee;
        this.policies          =    [];
        this.claimPolicy       =    [];
        this.agentrefer        =    agentName;
        this.nomineeRelation   =    nomineeRelation; 
        this.isActive          =    true;
    }

    static async createNewCustomer(firstName,lastName,userName,password,dob,address,email,state,city,pincode,nominee,nomineeRelation,agentName)
    {

        const [flag,message,newCredential] = await Credentials.createCredential(userName,password);
        if(flag === false)
        {
            return [false,"CustomerName already Exists"]
        }
        let age = Customer.age(dob);
        const db = new DatabaseMongoose();
        const role = "customer";
        let [dCredential,isCredCreated] = await db.insertOneCred(newCredential);
        let [record,isInserted]=await db.insertOneCustomer(
            new Customer(firstName,lastName,dCredential._id,dob,age,address,email,role,state,city,pincode,nominee,nomineeRelation,agentName)
        );
        if(!isInserted)
        {
            await db.deleteOneCred({"_id":dCredential._id});
            return [false,record];
        }
        return [true,"New Customer created"];
    }

    static async claimPolicy(policyId,userName){
        let [dUser,isUserExist] = await Customer.findCustomer(userName);
        if(!isUserExist){
            return [false,"Customer not Exist"];
        }
        const db = new DatabaseMongoose();
        const findpolicy = await db.getPolicy(dUser.credential);
        for(let index = 0; index<findpolicy[0].policies.length; index++)
        {
            let findpolicies = await db.findOnepolicy({"_id":findpolicy[0].policies[index]})
        }
        return;
    }

    static async findCustomer(userName)
    {
        const db = new DatabaseMongoose();
        const findCred = await db.findOneCred(
            {"userName":userName}
        );
        if(!findCred)
        {
            return [null,false];
        }
        const findCustomer = await db.findOneCustomer(
            {"credential":findCred._id}
        );
        
        if(findCustomer)
        {
            return [findCustomer,true];
        }
        return [null, false];
    }

    static async findCustomerId(CustomerId)
    {
        const db = new DatabaseMongoose();
        const findCustomer = await db.findOneCustomer(
            {"_id":CustomerId}
        );
        if(findCustomer)
        {
            return [findCustomer,true];
        }
        return [null,false];
    }

    static async findPayPolicy(policyId)
    {
        const db = new DatabaseMongoose();
        let record = await db.findOnePolicy({_id:policyId});
        if(!record){
            return [false,null];
        }
        return [true,record.installmentLeft[0]];
    }

    static async getAllCustomers()
    {
        const db = new DatabaseMongoose();
        const allCustomers = await db.getAllCustomers();
        return allCustomers;
    }

    static async getAllPolicies(userName)
    {
        let [dUser,isCustomerExists] = await Customer.findCustomer(userName);
        const db = new DatabaseMongoose();
        let allPolicies = [];
        for(let index=0; index<dUser.policies.length; index++){
            let indii = dUser.policies[index];
            let findPolicy = await db.findOnePolicy({_id:indii});
            allPolicies.push(findPolicy);
        }
        return allPolicies;
    }

    static async updateCustomerActive(isactive,customerId)
    {
        const db = new DatabaseMongoose();
        await db.updateOneCustomer(
            {_id:customerId},
            {$set:{isActive:isactive}}
        );
        return ;
    }

    static age(dateOfBirth)
    {
        const yearOfBirth = new Date(dateOfBirth);
        return 2022-yearOfBirth.getFullYear(); 
    }

    static async updateCustomer(userName, propertyToUpdate, value)
    {
        let [dUser,isUserExist] = await Customer.findCustomer(userName);
        if(!isUserExist)
        {
            return [false,"Customer not Found to updtae"];
        }
        const db = new DatabaseMongoose();
        switch (propertyToUpdate) 
        {
            case "FirstName": 
                await db.updateOneCustomer(
                    {_id:dUser._id},
                    {$set:{firstName:value}}
                );
                return [true,"Updated"];

            case "LastName": 
                await db.updateOneCustomer(
                    {_id:dUser._id},
                    {$set:{lastName:value}}
                ); 
                return [true,"Updated"];
            
            case "UserName":
                let UserNameExist = await db.findOneCred({userName:value});
                if(UserNameExist)
                {
                    return [false,"UserName ALready Exists"];
                }
                await db.updateOneCred(
                    {_id:dUser.credential},
                    {$set:{userName:value}}
                ); 
                return [true,"Updated"];
            
            case "dateOfBirth":
                await db.updateOneCustomer(
                    {_id:dUser._id},
                    {$set:{dateOfBirth:value}}
                );
                await db.updateOneCustomer(
                    {_id:dUser._id},
                    {$set:{age:Customer.age(value)}}
                );
                return [true,"Updated"];

            case "address":
                await db.updateOneCUstomer(
                    {_id:dUser._id},
                    {$set:{address:value}}
                );
                return [true,"Updated"];
                
            case "email":
                await db.updateOneCUstomer(
                    {_id:dUser._id},
                    {$set:{email:value}}
                );
                return [true,"Updated"];

            case "state":
                await db.updateOneCUstomer(
                    {_id:dUser._id},
                    {$set:{state:value}}
                );
                return [true,"Updated"];

            case "city":
                await db.updateOneCUstomer(
                    {_id:dUser._id},
                    {$set:{city:value}}
                );
                return [true,"Updated"];

            case "pincode":
                await db.updateOneCUstomer(
                    {_id:dUser._id},
                    {$set:{pincode:value}}
                );
                return [true,"Updated"];

            case "Password":
                await db.updateOneCred(
                  { _id: dUser.credential },
                  { $set: { password: await bcrypt.hash(value,10) } }
                );
                return [true, "Updated"];

            default: return [false,"Not Updated"];
        }
    }
}

module.exports = Customer;
