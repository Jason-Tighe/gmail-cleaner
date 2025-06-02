import { Router } from 'express'
import { getEmails, getEmailsByYear, getEmailsByDateRange } from '../controllers/gmailController.js'

const router = Router()
router.get('/email', (req, res, next) => {
    console.log('GET /gmail endpoint hit');
    getEmails(req, res, next);
});

router.get('/email/date-range', (req, res, next) => {
    console.log('GET /gmail/email/date-range endpoint hit');
    getEmailsByDateRange(req, res, next);
});

router.get('/email/:year', (req, res, next) => {
    console.log('GET /gmail/email/year endpoint hit');
    getEmailsByYear(req, res, next);
});

export default router
