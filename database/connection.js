import mongoose from 'mongoose'




const connectDB = async () => {

    const conn = await mongoose.connect("mongodb://localhost:27017/exam").then(console.log("connected to database")
    ).catch(err => console.log(err))

}

export default connectDB