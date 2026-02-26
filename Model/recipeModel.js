//step 1 to create database model and exporting

// import mongoose

const mongoose = require("mongoose");

// schema created through an object to store data like this model and datatype

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    instructions: {
        type: Array,
        required: true,
    },
    prepTimeMinutes: {
        type: Number,
        required: true,
    },
    cookTimeMinutes: {
        type: Number,
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    caloriesPerServing: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    mealType: {
        type: Array,
        required: true,
    },
});


//exporting for accesing model to other files like controller

const recipes=mongoose.model('recipes',recipeSchema)
module.exports=recipes    // module is seen everywhere in node.js for exporting.....,recipes having the daatabase collection