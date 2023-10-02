import Course from "../models/Course";

const createCourse = async (req, res) => {
    const { title, instructor, level, preRequisites, description, price } = req.body
    try {
        const newCourse = new Course({
            title,
            instructor,
            level,
            preRequisites,
            description,
            price,

        })
        await newCourse.save()
        return res.status(201).json({ msg: "Course created successfully..", newCourse })

    }
    catch (err) {
        return res.status(500).json(err)
    }
};


const getCourses = async (req, res) => {
    try {
        const courses = await Course.findById(req.params.id).populate("videos", {
            populate: {
                path: "author"
            }
            // nested populate
        }).populate("enrolled")
        return res.status(200).json(courses)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export { createCourse, getCourses } //named export
