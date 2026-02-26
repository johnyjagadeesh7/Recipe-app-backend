const testimonials=require('../Model/testiMonyModel')


exports.addtestiMonyController=async(req,res)=>{
    console.log("inside testimony function");
    const{name,email,message}=req.body //destructuring req body fron frontend when user entered

    try{
        const newTestimony=new testimonials({  //creating an object newTestimony TO STORE testsimonials(from models) data 
            name,email,message
        })
        await newTestimony.save()     // saved the client testimonial data from frontend user
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err)
    }
}



//get testimonials to admin side

exports.getTestimonials=async(req,res)=>{
    console.log("inside get testimonial function");

    try{
        const allTestimonials=await testimonials.find() //here we used "testimonials" model
            res.status(200).json(allTestimonials)
        
    }catch(err){
        res.status(401).json(err)
    }
    
}


//for updating status approved or rejected manualy by admin in admin side
//updateStatus

exports.updateStatusController=async(req,res)=>{
    console.log("inside updateStatus function");
    const{id}=req.params //id for each testonials created by mongodb database
    const status=req.query.status //status from query body we settuped in testimony model

    try{
        const updateTestimony=await testimonials.findById({_id:id})  //testimony models "testimonials"...to find by id
        updateTestimony.status=status //already ststus pending,from admin side status change to approved or rejected as we passed as status

        await updateTestimony.save() //then save that status
        res.status(200).json(updateTestimony) 
    }catch(err){
        res.status(401).json(err)
    }
    
}