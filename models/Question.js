import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    optionA: {
        type: String,
        required: true
    },
    optionB: {
        type: String,
        required: true
    },
    optionC: {
        type: String,
        required: true
    },
    optionD: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    markedAnswer: [{
        user:{type: Schema.Types.ObjectId, ref:"User"},
        answered:{type: String}
    }]
}, { timestamps: true })

export default mongoose.model("Question", questionSchema)