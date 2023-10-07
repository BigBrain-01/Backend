import Course from "../models/Course.js";
import Video from "../models/Video.js";

export const createCourse = async (req, res) => {
    try {
        const {title,className,subject,duration,level,thumbnail,instructor,price,preRequisites,description} = req.body
        const newCourse = new Course({
            title,
            className,
            subject,
            duration,
            level,
            thumbnail,
            instructor,
            price,
            preRequisites,
            description
        })
        await newCourse.save()
        return res.status(201).json({ msg: "Course created successfully..", newCourse })
    }
    catch (err) {
        return res.status(500).json({ msg: err.message})
    }
};

export const addVideo = async (req, res) => {
    try{
        const {title,videoURL,thumbnail,notes,assignement,practiceQuestions} = req.body
        const newVideo = new Video({
            title,
            videoURL,
            thumbnail,
            notes,
            assignement,
            practiceQuestions
        })
        await newVideo.save()
        const course = await Course.findById(req.params.id)
        course.videos.push(newVideo._id)
        await course.save()
        return res.status(201).json({status:"success",msg:"Video added successfully..",newVideo})
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
}

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.findById(req.params.id).populate("videos", {
            populate: {
                path: "author"
            }
        }).populate("enrolled")
        return res.status(200).json(courses)
    } catch (err) {
        return res.status(500).json(err)
    }
}
