
import mongoose, { Schema } from "mongoose"

const videoSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        videURL: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },
        description: {
            type: String,
            required: true
        },
        files: [
            {
                type: String,

            }
        ],


    }
    , { timestamps: true }
)

export default mongoose.model("Video", videoSchema)