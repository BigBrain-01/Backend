import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
export const register = async (req, res, next) => {
    const { username, email, password, fullName } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (user) return res.status(400).json({ msg: "User already exists, please login..." })
        const hash = bcrypt.hashSync(password, 10)
        const newUser = new User({
            username: username,
            email: email,
            fullname: fullName,
            password: hash
        })
        const token = jwt.sign({ id: newUser._id }, process.env.JWT, { expiresIn: "1d" })
        newUser.token = token
        await newUser.save()
        return res.status(201).json({ msg: "User created successfully..", newUser })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ msg: "User not found..." })
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) return res.status(400).json({ msg: "Incorrect credentials..." })
        const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "1d" })
        user.token = token
        await user.save()
        return res.status(201).json({ msg: "User logged in...", user })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const googleLogin = async (req, res, next) => {
        // console.log(req.body)
        



}