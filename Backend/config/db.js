const mongoose= require("mongoose");
const dotenv= require("dotenv")
dotenv.config()

const MongoDB= async()=>{
    try {
        await mongoose.connect("mongodb+srv://tpjishnu5:N8ud7M7qZkLu99Jr@cluster0.1wxxlnk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          
        })
        console.log("MONGODB CONNECTED");
        
    } catch (error) {
        console.log("error",error.message);
        process.exit(1)
        
    }
}
module.exports=MongoDB;