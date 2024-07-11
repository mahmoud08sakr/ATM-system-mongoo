import { Router } from 'express';
import accountModel from '../../../database/models/models/account.model.js';
import userModel from '../../../database/models/models/user.model.js';
import transactionModel from '../../../database/models/models/transaction.model.js';
const router = Router();


router.post('/createAccount', async (req, res) => {
    let { username } = req.body
    let data = await userModel.findOne({ username })
    if (data) {
        let foundedAccount = await accountModel.findOne({ user_id: data.id })
        if (foundedAccount) {
            res.json({ error: 'Account already exists' })
        } else {
            let accountData = await accountModel.insertMany({ user_id: data.id })
            if (!accountData) {
                res.json({ error: 'Failed to create account' })
            } else {
                res.json(accountData)
            }
        }
    } else {
        res.json({ error: 'you have to rigester first ' })
    }
})



router.put('/deposit', async (req, res) => {
    let { amount, username } = req.body
    let user = await userModel.findOne({ username })
    if (user) {
        let account = await accountModel.findOne({ user_id: user.id })
        if (account) {
            account.balance += amount
            await account.save()
            let data = await transactionModel.create({ amount, type: "deposit", account_id: account.id, transaction_date: new Date() })
            res.json(account)
        } else {
            res.json({ error: 'Account not found' })
        }
    } else {
        res.json({ error: 'User not found' })
    }
})



router.put('/withdraw', async (req, res) => {
    let { amount, username } = req.body
    let user = await userModel.findOne({ username })
    if (user) {
        let account = await accountModel.findOne({ user_id: user.id })
        if (account) {
            if (account.balance >= amount) {
                account.balance -= amount
                await account.save()
                await transactionModel.insertMany({ amount, type: "withdraw", account_id: account.id, transaction_date: new Date() })
                res.json(account)
            } else {
                res.json({ error: 'Insufficient balance' })
            }
        } else {
            res.json({ error: 'Account not found' })
        }
    } else {
        res.json({ error: 'User not found' })
    }
})


router.post('/balanceInquiry', async (req, res) => {
    let { username } = req.body
    let user = await userModel.findOne({ username })
    if (user) {
        let account = await accountModel.findOne({ user_id: user.id }).populate('user_id')
        if (account) {
            res.json(account)
        } else {
            res.json({ error: 'Account not found' })
        }
    } else {
        res.json({ error: 'User not found' })
    }
})

export default router