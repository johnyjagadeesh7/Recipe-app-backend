const express=require('express')  //here we imported express into router ,we are using router and express
//recipe
const recipeController=require('./Controllers/recipeController')  //step 3 imported recipeController for  all-recipes
//client-testimony
const testiMonyController=require('./Controllers/testiMonyController')  // step 3 imported for client testimony
//user-register
const userController=require('./Controllers/userController')  // step 3 imported for user-register
//token midlleware
const jwtMiddileware = require('./middlewares/jwtMiddileware')
//download recipe
const { addDownloadController } = require('./Controllers/downloadController')
//save-recipe
const saverecipeController=require('./Controllers/saverecipeController')






// Download
const downloadController=require('./Controllers/downloadController') //imported for download








// creating router
const router=new express.Router()  //here we called router








//all recipes
router.get('/all-recipies',recipeController.getAllRecipeController)     //url path of all recipes from recipe app > app routes 
//client testimony
router.post('/add-testimony',testiMonyController.addtestiMonyController)  // url path for client testimony
//user register
router.post('/register',userController.registerController)  // url path for user register
// user login
router.post('/login',userController.loginController)   // url path for user login
//viewRecipe
router.get('/view/:id/recipies',jwtMiddileware,recipeController.getArecipe) //needs middleware for getting token
// viewRecipe/relatedRecipe
router.get('/related-recipes',jwtMiddileware,recipeController.getRelatedRecipe)
// downloads
router.post('/downloads/:recipeId',jwtMiddileware,downloadController.addDownloadController)
//addsave-recipe
router.post('/recipe/save',jwtMiddileware,saverecipeController.addSavedRecipes)
//getsave-recipes
router.get('/saved-recipes',jwtMiddileware,saverecipeController.getSavedRecipes)
//remove-recipe
router.delete('/recipe/:id/remove',jwtMiddileware,saverecipeController.removeRecipe)



//get-testimony for Admin side to load testimonials
router.get('/all-testimonials',testiMonyController.getTestimonials)
//get-testimony for Admin side to update testimonials to be approved or rejected
router.get('/all-testimonials/:id',jwtMiddileware,testiMonyController.updateStatusController)
// get-allDownloads for to view in admin side....to know which recipe downloaded the most count
router.get('/all-downloads',jwtMiddileware,downloadController.getAllDownloads)
// get-allUsers for to view in admin side....to know user details name and email 
router.get('/all-users',jwtMiddileware,userController.getAllUsers)
//get-allRecipes in admin side to manage recipe ,add,delte,edit...same route is set above..//all-recipes

//add-recipe from admin side ,from managerecipe component through add-recipe form
router.post('/recipes/add',jwtMiddileware,recipeController.addRecipeController)
//edit-recipe from admin side ,from managerecipe component through edit-recipe form
router.put('/recipes/edit/:id',jwtMiddileware,recipeController.editArecipe)
//deleterecipe from admin side
router.delete('/recipes/:id/delete',jwtMiddileware,recipeController.deleteRecipes)





// export
module.exports=router //here we exported router
