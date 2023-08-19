import mongoose, { Schema } from 'mongoose'

const testSchema = new Schema({
    testId: {
        type: String,
    },
    participants: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        score: {
            type: Number,
            default: 0
        }
    }],
    sections: [{
        type: Schema.Types.ObjectId,
        ref : "Section"
    }]
},{timestamps:true})

export default mongoose.model("Test",testSchema);