const downloads=require('../Model/downloadModel')

//export variable name defining

exports.addDownloadController=async(req,res)=>{
    console.log("inside download function");
    const{recipeId}=req.params  //from req header ,by params we have to get recipe id(which is shown in urlof view recipe)
    const{name,cuisine}=req.body //from req body we can get from details of view recipe
    
    try{
        const existingRecipe=await downloads.findOne({recipeId})//using recipeid to find existing user or not
        if(existingRecipe){
            existingRecipe.count+=1 //in this case already counted existing recipe + now downloadcount.... is used for count total no of downloads were happend
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            const newDownloads=new downloads({  //in this case a newrecipe and not downloaded yes and firsttime to be downloaded which would set count as 1
                recipeId,recipeName:name,cuisine,count:1
            })

            await newDownloads.save()
            res.status(200).json(newDownloads)
            
        }

    }catch(err){
        res.status(401).json(err)
    }
    
}





// view all recipe downloaded by user its count and which recipe most downloaded..... from admin side

exports.getAllDownloads=async(req,res)=>{
    console.log("inside getAllDownloads");


    try {

        const existingDownloads=await downloads.find() //find downloads from existing collection name "downloads"
        res.status(200).json(existingDownloads)
        
    } catch (err) {

        res.status(401).json(err)
        
    }
    
}