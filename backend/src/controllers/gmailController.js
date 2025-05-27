import gmailService from '../services/gmail-service.js';


export const getEmails = async (req, res) => {
    try {
        console.log('Fetching emails for user:', req.query);
        // const emailId = req.params.emailId;
        // const emails = await gmailService.getEmails(emailId);
        const mockEmails = [
            {
              subject: 'Test Email',
              body: 'This is a mock email body.',
              sender: 'test@example.com',
            }
          ]
        res.status(200).json(mockEmails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};