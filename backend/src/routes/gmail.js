import { Router } from 'express'
import { getEmails } from '../controllers/gmailController.js'

const router = Router()
router.get('/email', (req, res, next) => {
    console.log('GET /gmail endpoint hit');
    getEmails(req, res, next);
});
router.get('/email/year', (req, res, next) => {
    console.log('GET /gmail/email/year endpoint hit');
    getEmails(req, res, next);
});


export default router
