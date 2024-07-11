import mongoose from "mongoose";


let accountSchema = new mongoose.Schema({
    balance:{
        type:Number,
        default:0
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    }
})


let accountModel = mongoose.model("account",accountSchema)
export default accountModel