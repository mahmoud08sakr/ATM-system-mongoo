import { Router } from 'express';
import userModel from '../../../database/models/models/user.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = Router();




router.get("/getAllUsers", async (req, res) => {
    let data = await userModel.find()
    res.json(data)
})



router.post('/register', async (req, res) => {
    const { username, password } = req.body
    let hashedPassword = await bcrypt.hash(password, 10)
    let addedUser = await userModel.insertMany({ username, password: hashedPassword })
    if (addedUser) {
        res.json({ message: "user added successfully" , addedUser })
    } else {
        res.json({ message: "something went wrong" })
    }
})


router.post('/login', async (req, res) => {
    const { username, password } = req.body
    let user = await userModel.findOne({ username })
    if (user) {
        let isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect) {
            let token = jwt.sign({ id: user._id }, "secret")
            res.json({ message: "user logged in successfully", token })
        } else {
            res.json({ message: "something went wrong" })
        }
    } else {
        res.json({ message: "something went wrong" })
    }
})


export default router