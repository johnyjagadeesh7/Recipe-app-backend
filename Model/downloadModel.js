const mongoose=require('mongoose')

    // create object schema
    const downloadSchema=new mongoose.Schema({
        recipeId:{
            type:String,
            required:true
        },
         recipeName:{
            type:String,
            required:true
        },
         cuisine:{
            type:String,
            required:true
        },
         count:{
            type:Number,
            required:true
        },

    })


    // export

    const downloads=mongoose.model("downloads",downloadSchema)
    module.exports=downloads
