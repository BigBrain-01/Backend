import Question from "../models/Question.js"
import Subject from "../models/Subject.js"

export const createSubject = async(req,res,next) =>{
    const {subjectName,className,subjectType,preferedBooks,description} = req.body
    try{
        const newSubject = new Subject({
            subjectName: subjectName,
            className:className,
            preferedBooks:preferedBooks,
            subjectType:subjectType,
            description:description
        })
        await newSubject.save()
        return res.status(200).json({msg:"Subject created...",newSubject})
    }catch(err){
        return res.status(500).json(err)
    }
}

export const deleteSubject = async(req,res,next) =>{
    const { subjectId } = req.params
    try{
        await Subject.findByIdAndRemove(subjectId)
        return res.status(200).json({msg:"Subject deleted..."})
    }catch(err){
        return res.status(500).json(err)
    }
}

export const addQuestion = async(req,res,next) =>{
    try{
        const { subjectName, className, question, topic, image, optionA, optionB, optionC, optionD, correctAnswer } = req.body
        const subject = await Subject.findOne({subjectName:subjectName,className:className})
        const newQuestion = new Question({
            question:question,
            topic:topic,
            image:image,
            optionA:optionA,
            optionB:optionB,
            optionC:optionC,
            optionD:optionD,
            correctAnswer:correctAnswer
        })
        subject.questions.push(newQuestion._id)
        await newQuestion.save()
        await subject.save()
        return res.status(200).json({msg:"question added..."})
    }catch(err){
        return res.status(500).json(err)
    }
}

export const deleteQuestion = async(req,res,next) =>{
    const {subjectId,questionId} = req.params
    try{
        const subject = await Subject.findById(subjectId)
        if(subject.questions.includes(questionId)){
            const newQuestions = subject.questions.filter((value,i)=>{
                value !== questionId
            })
            subject.questions = newQuestions
            await Question.findByIdAndRemove(questionId)
        }
        else return res.status(400).json({msg:"Question not found..."})
        await subject.save()
        return res.status(200).json({msg:"Question deleted..."})
    }catch(err){
        return res.status(500).json(err)
    }
}
