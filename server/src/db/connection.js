const mongoose = require('mongoose')
const dbConnection =async()=>{
    const isConnected = await mongoose.connect('mongodb://127.0.0.1:27017/samajik_sanjal');
    if(isConnected){
        console.log("Database is connected")
    }else{
        console.log("Database Connection Error")
    }
}
module.exports = dbConnection
