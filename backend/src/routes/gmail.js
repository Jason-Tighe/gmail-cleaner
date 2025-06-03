import { Router } from 'express'
import { getEmails, getEmailsByYear, getEmailsByDateRange, getEmailsBySender} from '../controllers/gmailController.js'

const router = Router()
router.get('/email', (req, res, next) => {
    getEmails(req, res, next);
});

router.get('/email/date-range', (req, res, next) => {
    getEmailsByDateRange(req, res, next);
});

router.get('/email/sender', (req, res, next) => {
    console.log('GET /gmail/email/sender endpoint hit');
    getEmailsBySender(req, res, next);
});

router.delete('/email/delete', (req, res, next) => {
    console.log('DELETE /gmail/email/delete endpoint hit');
    // Implement delete functionality here if needed
    res.status(501).json({ success: false, message: 'Not Implemented' });
});

router.get('/email/:year', (req, res, next) => {
    getEmailsByYear(req, res, next);
});





export default router
