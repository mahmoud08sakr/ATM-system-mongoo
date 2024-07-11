
import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

let userModel = mongoose.model('user', userSchema)
export default userModel