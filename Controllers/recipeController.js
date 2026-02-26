// step 2 controller

// first importing schema
const recipes=require('../Model/recipeModel')


// 1.getAllRecipes,       to get all-recipe by writing query(with asynchronus operation async and keyword await)
// 2.also used as recipe list to view in admin side
exports.getAllRecipeController=async(req,res)=>{

    console.log("inside getallrecipe function");  //msg seen in terminal to know frontend and backend is working otherwise not works

    //  run time handling error by try catch mtd
    try{
        const allRecipes=await recipes.find()  //using find ,a mongoose command to return every single data inside recipe colection
        res.status(200).json(allRecipes) //using .json.... data found in database and convert it into json  format and send back to angular frontend
    }catch(err){
        res.status(401).json(err)
    }
}




//1. getArecipe,          to add content in a view-recipe(single recipe) from database,      
//2. also used to fetch recipe details in editform, in admin side
exports.getArecipe=async(req,res)=>{
    console.log("inside getArecipe function");
    const{id}=req.params //params is used to get url of user clicked single recipe...to viewrecipe all content.each recipe has diff url id...(ie, view/:id different/recipies)

    try{
        const viewRecipe=await recipes.findOne({_id:id})//....check userclicked(id)...and find same ( _id  data base id holding variable) in database(recipes:database content here)
        res.status(200).json(viewRecipe) //if id get frm database ,then store that id recipe content in viewRecipe
    }catch(err){
        res.status(401).json(err)
    }
    
}



// getRelatedRecipe,     to see content below view-recipe as relatedrecipes with relating viewed recipes as  same of cuisine types recipies
exports.getRelatedRecipe=async(req,res)=>{
    console.log("inside relatedrecipe function ");
    const cuisine=req.query.cuisine

    try{
        const relatedRecipes=await recipes.find({cuisine})
        res.status(200).json(relatedRecipes)
    }catch(err){
        res.status(401).json(err)
    }
    
    
}



// post addrecipe from adminside.... frontendside
exports.addRecipeController=async(req,res)=>{
    console.log("inside addRecipe function");
//destruture the body to get data from frontend
    const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body

    try{
        const existingRecipe=await recipes.findOne({name}) //using name we can find any existing recipe in Datacollection  "recipes",while adding a new recipe by adminside
        if(existingRecipe){
            res.status(406).json("recipe already exist...please add another one")
        }else{//not a existing recipe,save that new recipe  in  an object as "newRecipe" in datacollection "recipes"
            const newRecipe= new recipes({ 
                name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,
                servings,difficulty,cuisine,caloriesPerServing,image,mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//editArecipe from adminside.... frontendside,also need get a recipe by id to fetch data to edit form....we already created above to get a recipe in view-recipe pg
exports.editArecipe=async(req,res)=>{
    console.log("inside editArecipe function");
    const{id}=req.params

    try{
        const editRecipe=await recipes.findByIdAndUpdate({_id:id},req.body,{new:true}) //here use{new:true} to return the data changes after update is done by findByIdAndUpdate()
       
        // await editRecipe.save() //not use of this save because...findByIdAndUpdate() do update changes and save immediately in backend database
        res.status(200).json(editRecipe)

    }catch(err){
        res.status(401).json(err)
    }
    
}











//deleterecipes from admin side
exports.deleteRecipes=async(req,res)=>{
    console.log("inside deleteRecipe function");
    const {id}=req.params

    try{
        const deleteRecipe=await recipes.findByIdAndDelete({_id:id})
        res.status(200).json(deleteRecipe)
    }catch(err){
        res.status(401).json(err)
    }
    
}