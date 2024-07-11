import { Router } from 'express';
import transactionModel from '../../../database/models/models/transaction.model.js';
const router = Router();




router.get('/history/:accountId', async (req, res) => {
    let { accountId } = req.params
    let data = await transactionModel.find({ account_id: accountId }).populate('account_id')
    if (data) {
        res.json(data)
    } else {
        res.json({ error: 'No transactions found' })
    }
})


export default router