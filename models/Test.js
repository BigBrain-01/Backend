import mongoose, { Schema } from 'mongoose'

const testSchema = new Schema({
    testId: {
        type: String,
    },
    participants: [{
        user: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            default: 0
        }
    }],
    sections: [{
        type: Schema.Types.ObjectId,
        ref : "Section"
    }],
    class:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model("Test",testSchema);