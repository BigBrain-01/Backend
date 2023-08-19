import Question from "../models/Question.js"
import Section from "../models/Section.js"
import Test from "../models/Test.js"

export const createQuestion = async (req, res, next) => {
    const { question, optionA, optionB, optionC, optionD, correctAnswer, sectionName } = req.body
    try {
        const newQuestion = new Question({
            question: question,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            correctAnswer: correctAnswer
        })
        await newQuestion.save()
        console.log("question saved...")
        let section = await Section.findOne({ sectionName: sectionName })
        console.log(section)
        if (!section) {
            section = new Section({
                sectionName: sectionName
            })
            console.log(section)
            const test = await Test.findById(req.params.testId)
            console.log(test)
            test.sections.push(section._id)
            await test.save()
            console.log("section created...")
        }
        section.questions.push(newQuestion._id)
        await section.save()
        console.log("section saved...")
        return res.status(400).json({msg:"Question added.."})
    }catch(err){
        return res.status(500).json(err)
    }
}
