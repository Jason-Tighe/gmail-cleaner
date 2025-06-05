import { Router } from 'express'
import { getEmails, getEmailsByYear, getEmailsByDateRange, getEmailsBySender, getLabels, getEmailsByLabel, batchDeleteEmails} from '../controllers/gmailController.js'
import { batch } from 'googleapis/build/src/apis/batch/index.js';

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

router.get('/email/labels', (req, res, next) => {
    console.log('GET /gmail/email/labels endpoint hit');
    getLabels(req, res, next);
});

router.get('/email/by-labels', (req, res, next) => {
    console.log('GET /gmail/email/by-labels endpoint hit');
    getEmailsByLabel(req, res, next);
});

router.delete('/email/delete', (req, res, next) => {
    console.log('DELETE /gmail/email/delete endpoint hit');
    batchDeleteEmails(req, res, next);
});

router.get('/email/:year', (req, res, next) => {
    getEmailsByYear(req, res, next);
});





export default router
