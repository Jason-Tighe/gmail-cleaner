import { gmail } from 'googleapis/build/src/apis/gmail/index.js';
import GmailService from '../services/gmail-service.js';

const gmailService = new GmailService();

export const getEmails = async (req, res) => {
    try {
        console.log('Fetching emails for user:', req.query);
        const { emailAddress, accessToken} = req.query
        const tokenValidity = await gmailService.checkTokenValidity(accessToken);
        console.log('Token validity:', tokenValidity);
        const emails = await gmailService.getEmails(emailAddress, accessToken);
        console.log('Fetched emails:', emails);
        const emailDetails = await gmailService.describeEmail(emailAddress, emails, accessToken);
        console.log('Email details:', emailDetails);
        res.status(200).json(emailDetails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};