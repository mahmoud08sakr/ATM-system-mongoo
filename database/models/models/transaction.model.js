import mongoose from "mongoose";


let transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        default:0
    },
    type:{
        type:String
    },
    transacionDate:{
        type:Date
    },
    account_id:{
        type:mongoose.Schema.ObjectId,
        ref:"account"
    }
})


let transactionModel = mongoose.model("transaction",transactionSchema)
export default transactionModel