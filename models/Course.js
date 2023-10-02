import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    description: {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    enrolled: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    preRequisites: [
        {
            type: String,
            required: true,
        }
    ],
    level: [
        {
            type: String,
            required: true,
        }
    ],

})

export default mongoose.model("Course", courseSchema)
