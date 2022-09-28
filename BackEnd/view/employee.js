const Credentials = require("./credential");
const { DatabaseMongoose } = require("../repository/database");
const bcrypt = require("bcrypt");
class Employee {
  constructor(firstName, lastName, credential, role, isActive) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.credential = credential;
    this.role = role;
    this.isActive = isActive;
  }

  static async createNewEmployee(
    userName,
    password,
    firstName,
    lastName,
    role,
    isActive
  ) {
    const [flag, message, newCredential] = await Credentials.createCredential(
      userName,
      password
    );

    if (flag === false) {
      return [false, "LoginID Already Exists"];
    }
    const db = new DatabaseMongoose();
    const [dCredential, isCredCreated] = await db.insertOneCred(newCredential);
    const [record, isInserted] = await db.insertOneEmployee(
      new Employee(firstName, lastName, dCredential._id, role, isActive)
    );
    if (!isInserted) {
      await db.deleteOneCred({ _id: dCredential._id });
      return [false, record];
    }
    return [true, "Employee Created Sucessfully"];
  }

  static async createAdmin(userName, password, firstName, lastName,isActive) {
    const role = "admin";
    const [flag, message, newCredential] = await Credentials.createCredential(
      userName,
      password
    );
    if (flag === false) {
      return [false, "LoginID Already Exists"];
    }
    const db = new DatabaseMongoose();
    let [dCredential,isInsertedCred] = await db.insertOneCred(newCredential);
    const [record, isInserted] = await db.insertOneEmployee(
      new Employee(firstName, lastName, dCredential, role,isActive)
    );
    if (!isInserted) {
      await db.deleteOneCred({ _id: dCredential._id });
      return [false, record];
    }
    return [true, "ADmin Created Sucessfully"];
  }

  async comparePassword(password) {
    let isPassword = await bcrypt.compare(password, this.credential.password);
    return isPassword;
  }

  static async findEmployee(userName) {
    const db = new DatabaseMongoose();
    const findCred = await db.findOneCred({ userName: userName });
    if (!findCred) {
      return [null, false];
    }
    const findEmployee = await db.findOneEmployee({ credential: findCred._id });
    if (findEmployee) {
      return [findEmployee, true];
    }
    return [null, false];
  }

  static async findEmployeeId(employeeId) {
    const db = new DatabaseMongoose();
    const findEmployee = await db.findOneEmployee({ _id: employeeId });
    if (findEmployee) {
      return [findEmployee, true];
    }
    return [null, false];
  }

  static async allEmployees() {
    const db = new DatabaseMongoose();
    const allEmployees = await db.getAllEmployees();
    return allEmployees;
  }

  static async updateEmployeeActive(isactive, employeeId) {
    const db = new DatabaseMongoose();
    await db.updateOneEmployee(
      { _id: employeeId },
      { $set: { isActive: isactive } }
    );
    return;
  }

  static async update(userName, propertyToUpdate, value) {
    const db = new DatabaseMongoose();
    let [dUser, isUserExist] = await Employee.findEmployee(userName);
    if (!isUserExist) {
      return [false, "Not found User to Update"];
    }

    switch (propertyToUpdate) {
      case "FirstName":
        await db.updateOneEmployee(
          { _id: dUser._id },
          { $set: { firstName: value } }
        );
        return [true, "Updated"];

      case "LastName":
        await db.updateOneEmployee(
          { _id: dUser._id },
          { $set: { lastName: value } }
        );
        return [true, "Updated"];

      case "UserName":
        let UserNameExist = await db.findOneCred({userName:value});
        if(UserNameExist)
        {
            return [false,"UserName ALready Exists"];
        }
        await db.updateOneCred(
          { _id: dUser.credential },
          { $set: { userName: value } }
        );
        return [true, "Updated"];

      case "Password":
        await db.updateOneCred(
          { _id: dUser.credential },
          { $set: { password: await bcrypt.hash(value,10) } }
        );
        return [true, "Updated"];

      default:
        return [false, "Not Updated"];
    }
  }
}
module.exports = Employee;
