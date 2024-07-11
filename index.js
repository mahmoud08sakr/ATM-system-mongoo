import express, { json } from 'express'
import connectDB from './database/connection.js'
import userRouter from './src/modules/user/user.router.js'
import accountRouter from './src/modules/account/account.router.js'
import transactionRoutes from './src/modules/transaction/transaction.router.js'
connectDB()
const app = express()
const port = 3000

app.use(json())
app.use('/users', userRouter)
app.use("/account", accountRouter)
app.use("/transaction", transactionRoutes)


app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))