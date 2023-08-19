import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema({
    sectionName: {
        type: String,
        required: true
    },
    questions:[{
        type:Schema.Types.ObjectId,
        ref:"Question"
    }]
})

export default mongoose.model("Section",sectionSchema)