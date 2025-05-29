import { gmail } from 'googleapis/build/src/apis/gmail/index.js';
import GmailService from '../services/gmail-service.js';

const gmailService = new GmailService();

export const getEmails = async (req, res) => {
    try {
        console.log('Fetching emails for user:', req.query);
        const { emailAddress, accessToken} = req.query
        // const tokenValidity = await gmailService.checkTokenValidity(accessToken);
        // console.log('Token validity:', tokenValidity);
        
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


export const getEmailsByYear = async (req, res) => {
    try {
        console.log('Fetching emails by year for user:', req.query);
        const { emailAddress, accessToken, year} = req.query;    
        const emails = await gmailService.getEmailsByYear(emailAddress, accessToken, year);
        console.log('Fetched emails by year:', emails);
        res.status(200).json(emails);
    } catch (error) {
        console.error('Error fetching emails by year:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const getEmailsByDateRange = async (req, res) => {
    try {
        console.log('Fetching emails by year for user:', req.query);
        const { emailAddress, accessToken, startDate, EndDate } = req.query;
        const emails = await gmailService.getEmailsByDateRange(emailAddress, accessToken, startDate, EndDate);
        res.status(200).json(emails);
    } catch (error) {
        console.error('Error fetching emails by year:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}