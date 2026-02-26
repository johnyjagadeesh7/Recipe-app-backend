const saverecipes=require('../Model/saverecipeModel')
 

//adding recipes to saved recipes
exports.addSavedRecipes=async(req,res)=>{
    console.log("Inside addsave-recipe function");

    const{id,name,cuisine,image}=req.body //details from body of recipe content

    const userId=req.playload  //userid can only take from playload(alomost from frontend)

    try{
        const existingRecipe=await saverecipes.findOne({recipeId:id})

        if(existingRecipe){ //recipe is existing in "saverecipe" ,already saved recipes
            res.status(406).json("selected recipe already in your collection")
        }else{ //if not saved this recipe and save it as "newRecipe"
            const newRecipe=new saverecipes({
                recipeId:id,recipeName:name,image,cuisine,userId    //here userid also taken from payload,so while testing in postman userid not passed manually..only body contents are passed
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }

    }catch(err){
        res.status(401).json(err)
    }
    
}

//to 'get' already added saved recipe and can see on browser to view saved-recipes
exports.getSavedRecipes=async(req,res)=>{
    console.log("inside getsaved-recipes");
    const userId=req.playload //user id only can taken from playload

    try{
        const allSavedRecipes=await saverecipes.find({userId}) //finding savedrecipes with specific (user id)
        res.status(200).json(allSavedRecipes)
    }catch(err){
        res.status(401).json(err)
    }
}


//to remove 1 or more already added saved recipe on button click and can show remaining recipe or nothing
exports.removeRecipe=async(req,res)=>{
    console.log("inside remove-recipe functon");
    const{id}=req.params //backend id from parameter(ie params,here it is recipe id)

    try{

        const removeRecipe=await saverecipes.findByIdAndDelete({_id:id})  //delete a specific id(_id backend stored recipe id in this key) by..."findByIdAndDelete"
        res.status(200).json(removeRecipe)

    }catch(err){
        res.status(401).json(err)
    }
}