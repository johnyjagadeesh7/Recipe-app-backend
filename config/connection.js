// conecting mongodb with server
const mongoose=require('mongoose') //imported

const ConnectionString=process.env.ConnectionString //url of database inside this connectionstring @ .env

mongoose.connect(ConnectionString).then((res)=>{
    console.log("database connected successfully");
    
}).catch((err)=>{
    console.log(err,"database connected failed");
    

})