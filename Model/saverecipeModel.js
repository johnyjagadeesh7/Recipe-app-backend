const mongoose=require('mongoose')

const saveRecipeSchema=new mongoose.Schema({
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
     image:{
        type:String,
        required:true
    },
     userId:{
        type:String,
        required:true
    }
     

})

const saverecipes=mongoose.model('saverecipes',saveRecipeSchema)
module.exports=saverecipes