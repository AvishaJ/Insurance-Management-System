const Credentials = require('../../view/credential.js');
const Customer = require('../../view/customer.js');
const Employee = require('../../view/employee');
const JWTPayload  = require('../../view/authentication');

async function createCustomer(req,resp)
{
    const {firstName,lastName,userName,password,dateOfBirth,address,email,stateName,cityName,pincode,nominee,nomineeRelation,agentName} = req.body;
    const [isCustomerCreate,msz] = await Customer.createNewCustomer(firstName,lastName,userName,password,dateOfBirth,address,email,stateName,cityName,pincode,nominee,nomineeRelation,agentName);
    if(!isCustomerCreate)
    {
        resp.status(403).send(msz);
        return ;
    }
    resp.status(201).send(msz);
    return;
}

async function getAllCustomer(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin" && newPayload.role!="employee"&& newPayload.role!="agent"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    const { limit, pageNumber } = req.body;
    let allCustomer = await Customer.getAllCustomers();
    if (allCustomer.length == 0) {
        return resp.status(403).send("No Customer Exist");
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send([allCustomer.slice(startIndex,endIndex),allCustomer]);
    return;
}

async function noOfCustomer(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin" && newPayload.role!="employee" && newPayload.role!="agent"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    let allCustomer = await Customer.getAllCustomers();
    resp.status(201).send(allCustomer.length.toString());
    return;
}

async function updateCustomer(req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "customer" && newPayload.role!="employee" && newPayload.role!="admin"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    let [employee,isEmployeeEsists] = await Employee.findEmployee(userName);
    let [customer,isCustomerEsists] = await Customer.findCustomer(userName);

    //Employee Update Customer
    if(isEmployeeEsists){
        if(employee.credential != newPayload.userName){
            resp.status(401).send("please login with correct userName")
            return;
        }
        let {customertoUpdate,propertyToUpdate,value} = req.body;

        const [isUpdate,msz] =await Customer.updateCustomer(customertoUpdate,propertyToUpdate,value);
        if(!isUpdate){
            resp.status(403).send(msz)
            return;
        }
        resp.status(201).send(msz);
        return;
    }
    //CustomerUpdateHimself
    if(isCustomerEsists){
        if(customer.credential != newPayload.userName){
            resp.status(401).send("please login with correct userName")
            return;
        }
        let customertoUpdate = userName;
        let {propertyToUpdate,value} = req.body;

        const [isUpdate,msz] =await Customer.updateCustomer(customertoUpdate,propertyToUpdate,value);
        if(!isUpdate){
            resp.status(403).send(msz)
            return;
        }
        resp.status(201).send(msz);
        return;
    }
    resp.status(401).send("Login with correct username");
    return;
}

async function deleteCustomer (req,resp)
{
    let userName = req.params.userName;
    const newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "customer" && newPayload.role!="employee" && newPayload.role!="admin"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    let [employee,isEmployeeEsists] = await Employee.findEmployee(userName);
    let [customer,isCustomerEsists] = await Customer.findCustomer(userName);
    
    //Employee Update Customer
    if(isEmployeeEsists){
        if(employee.credential != newPayload.userName){
            resp.status(401).send("please login with correct userName")
            return;
        }
        const customerId = req.body.customerId;
        let [Customerfind, isCustomerIdExists] =await  Customer.findCustomerId(customerId);
        if(!isCustomerIdExists)
        {
            resp.status(403).send("Customer not Found");
            return;
        }
        (Customerfind.isActive== true)? (Customerfind.isActive = false) : (Customerfind.isActive = true);
        await Customer.updateCustomerActive(Customerfind.isActive,Customerfind._id);
        resp.status(201).send("Updated");
        return;
    }
    //CustomerUpdateHimself
    if(isCustomerEsists){
        if(customer.credential != newPayload.userName){
            resp.status(401).send("please login with correct userName")
            return;
        }
        const customerId = req.body.customerId;
        let [Customerfind, isCustomerIdExists] =await  Customer.findCustomerId(customerId);
        if(!isCustomerIdExists)
        {
            resp.status(403).send("Customer not Found");
            return;
        }
        (Customerfind.isActive== true)? (Customerfind.isActive = false) : (Customerfind.isActive = true);
        await Customer.updateCustomerActive(Customerfind.isActive,Customerfind._id);
        resp.status(201).send("Updated");
        return;
    }
}

async function getMyAllPolicy(req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "customer"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    let [customer,isCustomerEsists] = await Customer.findCustomer(userName);
    if(!isCustomerEsists){
        return resp.status(403).send("CUstomer Not Found")
    }
    const { limit, pageNumber } = req.body;
    let allPolicy = await Customer.getAllPolicies(userName);
    if (allPolicy.length == 0) {
        return resp.status(403).send("No Policy Exist");
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send([allPolicy.slice(startIndex,endIndex),allPolicy]);
    return;
}

module.exports = {createCustomer,getAllCustomer,noOfCustomer,updateCustomer,deleteCustomer,getMyAllPolicy};