import mongoose, {Schema} from "mongoose";

const subjectSchema = new Schema({
    subjectName:{
        type:String,
        required: true
    },
    className:{
        type:String,
        required: true
    },
    subjectType:{
        type:String,
    },
    preferedBooks:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    questions:[{
        type:Schema.Types.ObjectId,
        ref: "Question"
    }],
    test:[{
        type:Schema.ObjectId,
        ref:"Test"
    }],
    course:[{
        type:Schema.ObjectId,
        ref:"Course"
    }]
},{timestamps:true})

export default mongoose.model("Subject",subjectSchema)