import Test from "../models/Test.js"
import User from "../models/User.js"

export const createTest = async (req, res, next) => {
    try {
        const newTest = new Test({
        })
        await newTest.save()
        return res.status(201).json({ msg: "Test created successfully...", newTest })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const testLogin = async(req,res,next) =>{
    const {email,testId} = req.body
    try {
        const test = await Test.findOne({testId:testId})
        if(!test) return res.status(400).json({msg:"Invalid Test ID..."})
        const hasParticipated = test.participants.includes({user:email})
        if(!hasParticipated) return res.status(400).json({msg:"You are not registered for the test..."})
        return res.status(200).json({msg:"Logged in successfully",test})
    } catch (error) {
        return res.status(500).json(err)
    }
}

export const addParticipants = async(req,res,next) =>{
    const {email} = req.body
    try{
        const test = await Test.findById(req.params.testId)
        if(!test) return res.status(400).json({msg:"Invalid Test ID..."})
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json("User not found, please create an account to register...")
        test.participants.push({user:user._id})
        await test.save()
        return res.status(200).json({msg:"Registered successfully..."})
    }catch(err){
        return res.status(500).json(err)
    }
}