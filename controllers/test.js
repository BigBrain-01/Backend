import Test from "../models/Test.js"
import User from "../models/User.js"

export const createTest = async (req, res, next) => {
    try {
        const id = req.test.id
        const newTest = new Test({
            testId: id,
            class: req.body.class
        })
        await newTest.save()
        return res.status(201).json({ msg: "Test created successfully...", newTest })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const testLogin = async (req, res, next) => {
    const { username, testId } = req.body
    try {
        const test = await Test.findOne({ testId: testId })
        if (!test) return res.status(400).json({ msg: "Invalid Test ID..." })
        const user = await User.findOne({ username: username })
        if (!user) return res.status(400).json("User not found, please create an account to register...")
        const hasParticipated = test.participants.includes({ user: username })
        if (!hasParticipated) return res.status(400).json({ msg: "You are not registered for the test..." })
        return res.status(200).json({ msg: "Logged in successfully", test })
    } catch (error) {
        return res.status(500).json(err)
    }
}

export const addParticipants = async (req, res, next) => {
    const { email } = req.body
    try {
        const test = await Test.findById(req.params.testId)
        if (!test) return res.status(400).json({ msg: "Invalid Test ID..." })
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json("User not found, please create an account to register...")
        let hasParticipated = false;
        test.participants.filter((value) => {
            if (value.user === user.username) hasParticipated = true
        })
        if(hasParticipated) return res.status(400).json({ msg: "Already registered..." })
        test.participants.push({user:user.username})
        await test.save()
        return res.status(200).json({ msg: "Registered successfully..." })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const getTest = async (req, res, next) => {
    const { testId } = req.params
    try {
        const test = await Test.findOne({ testId: testId }).populate({
            path: 'sections',
            populate: {
                path: "questions"
            }
        })
        if (!test) return res.status(400).json({ msg: "Invalid Test id..." })
        return res.status(200).json(test)
    } catch (err) {
        return res.status(500).json(err)
    }
}