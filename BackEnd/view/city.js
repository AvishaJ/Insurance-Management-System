const {DatabaseMongoose} = require('../repository/database');
class City{
    constructor(cityName,isActive)
    {
        this.cityName  = cityName;
        this.isActive  = isActive; 
    }

    static async createNewCity(stateName,cityName,isActive)
    {
        const db = new DatabaseMongoose();
        let findState = await db.findOneState({"stateName":stateName});
        if (!findState)
        {
            return [false,"State Not found"];
        }
        const [findCity,isCityExists] = await City.findCity(stateName,cityName);
        if(isCityExists){
            return [false,`This city already exist in state :${stateName}`];
        }
        let newCity = await db.insertOneCity(new City(cityName,isActive));
        await db.updateOneState({_id:findState._id},{$push:{"city":newCity}})
        return [true,"City Created SuccessFully"];
    }

    //find City with stateName
    static async findCity(stateName,cityName) {
        const db = new DatabaseMongoose();
        let findState = await db.findOneState({"stateName":stateName});
        if (!findState)
        {
            return [null,false];
        }
        if (findState.isActive == false)
        {
            return [null,false];
        }
        for(let index=0; index<findState.city.length; index++)
        {
            let indexOfCity = findState.city[index];
            let findCity    = await db.findOneCity({"_id":indexOfCity});
            if (findCity.cityName == cityName){
                return [findCity,true]
            }
        }
        return [null, false];
    }

    //find City without stateName
    static async findCityWState(cityName){
        const db = new DatabaseMongoose();
        let findCity = await db.findOneCity({cityName:cityName});
        if(!findCity)
        {
            return [null,false];
        }
        return [findCity,true];
    }

    static async allCities(stateName)
    {   
        const db = new DatabaseMongoose();
        let findState = await db.findOneState({"stateName":stateName});
        if(findState.city.length == 0)
        {
            return [null,false];
        }
        const allCities = [];
        for(let index=0; index<findState.city.length; index++)
        {
            let findCity    = await db.findOneCity({"_id":findState.city[index]});
            allCities.push(findCity);
        }
        return [allCities,true];
    }

    static async updateCityActive(isactive, cityId) {
        const db = new DatabaseMongoose();
        await db.updateOneCity(
          { _id: cityId },
          { $set: { isActive: isactive } }
        );
        return;
    }

    static async update(citytoUpdate, value) {
        const db = new DatabaseMongoose();
        let findCity = await db.findOneCity({"cityName":citytoUpdate});
        if(!findCity){
            return [false,"City not exists"];
        }
        let findCityName = await db.findOneCity({"cityName":value});
        if(findCityName){
            return [false,"CityName already exists"];
        }
        let [record,isUpdate] = await db.updateOneCity(
                                           {_id: findCity._id},
                                           { $set:{ cityName: value}}
                                        );
        if(!isUpdate){
            return [false,"Not Updated"];
        }
        return [true,"Updated"]
    }
}

module.exports = City;