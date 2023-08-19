import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

const connect = () =>{
    try{
        mongoose.connect(process.env.MONGO)
    }catch(err){
        throw(err)
    }
}

export default connect