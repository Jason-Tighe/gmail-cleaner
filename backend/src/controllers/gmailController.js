import GmailService from '../services/gmail-service.js';

const gmailService = new GmailService();

export const getEmails = async (req, res) => {
    try {
        console.log('Fetching emails for user:', req.query);
        const { email, accessToken} = req.query
        
        const emails = await gmailService.getEmails(email, accessToken);
        console.log('emails pulled:', JSON.stringify(emails, null, 2));
        res.status(200).json(emails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};