import gmailService from '../services/gmail-service.js';


export const getEmails = async (req, res) => {
    try {
        console.log('Fetching emails for user:', req.params.emailId);
        const emailId = req.params.emailId;
        const emails = await gmailService.getEmails(emailId);
        res.status(200).json(emails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};