import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    subject: {
        type: String,   
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    preRequisites: [{
        type: String,
        required: true,
    }],
    description: {
        type: String,
        required: true
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    enrolled: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
})

export default mongoose.model("Course", courseSchema)
