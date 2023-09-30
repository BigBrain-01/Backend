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
        return res.status(200).json({ msg: "Question added.." })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const editQuestion = async (req, res, next) => {
    const { quesId } = req.params
    const { questionBody, optionA, optionB, optionC, optionD, correctAnswer, sectionName } = req.body
    try {
        const question = await Question.findById(quesId)
        const sections = await Section.findOne({ questions: quesId })
        question.question = questionBody
        question.opt = opt
        question.optionB = optionB
        question.optionC = optionC
        question.optionD = optionD
        question.correctAnswer = correctAnswer
        if (sections.sectionName !== sectionName) {
            sections.questions = sections.questions.filter((value, i) => {
                value !== quesId
            })
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
            section.questions.push(quesId)
            await section.save()
        }
        await question.save()
    }catch(err){
        return res.status(500).json(err)
    }
}