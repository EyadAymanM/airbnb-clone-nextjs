import mongoose from "mongoose";

export function dbConnection(){
    
    mongoose.connect(`mongodb+srv://TeamMEARN:${process.env.SECRET}@airbnb.l8sfib7.mongodb.net/airbnb?retryWrites=true&w=majority`).then(()=>{ 
               console.log("connected to db");
        
    }).catch((err)=>{
        console.log(err);
        
    })
}