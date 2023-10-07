
import mongoose, { Schema } from "mongoose"

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    videURL: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    notes:[{
        type: String
    }],
    assignment:[{
        type: String
    }],
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    practiceQuestions:[{
        type: String
    }]
}, { timestamps: true })

export default mongoose.model("Video", videoSchema)