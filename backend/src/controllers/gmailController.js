import { gmail } from 'googleapis/build/src/apis/gmail/index.js';
import GmailService from '../services/gmail-service.js';

const gmailService = new GmailService();


// Get Emails by a set of criteria/filters from the frontend
export const getEmails = async (req, res) => {
    try {
        console.log('Fetching emails for user:', req.query);
        const { emailAddress, accessToken} = req.query
        // const tokenValidity = await gmailService.checkTokenValidity(accessToken);
        // console.log('Token validity:', tokenValidity);
        
        const emails = await gmailService.getEmails(emailAddress, accessToken);
        const emailDetails = await gmailService.describeEmail(emailAddress, emails, accessToken);
        res.status(200).json(emailDetails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get All Emails by Year
export const getEmailsByYear = async (req, res) => {
    try {
        const year = req.params.year;
        const emailAddress = req.query.email;
        const filter = req.query.filter; 
        const accessToken  = req.headers.authorization
        const { cacheKey, emailTotalCount } = await gmailService.getEmailsByYear(emailAddress, accessToken, year, filter);
        res.status(200).json({ cacheKey, emailTotalCount });
    } catch (error) {
        console.error('Error fetching emails by year:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Get Emails by Date Range
export const getEmailsByDateRange = async (req, res) => {
    try {
        const { email, startDate, endDate, filter } = req.query;
        const accessToken  = req.headers.authorization
        const { cacheKey, emailTotalCount } = await gmailService.getEmailsByDateRange(email, accessToken, startDate, endDate, filter);
        res.status(200).json({ cacheKey, emailTotalCount });
    } catch (error) {
        console.error('Error fetching emails by year:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Get Emails by Sender
export const getEmailsBySender = async (req, res) => {
    try {
        const { email, startDate, endDate, filter} = req.query;
        let sender = req.query.sender
        let emailTotalCount, cacheKey;
        if (!Array.isArray(sender)) {
            sender = [sender];
        }
        const accessToken  = req.headers.authorization
        if(sender.length === 0) {
            return res.status(400).json({ success: false, message: 'Sender email is required' });
        }
        if(startDate === '' && endDate === '') {
            ({ emailTotalCount, cacheKey } = await gmailService.getEmailsBySender(email, sender, filter, accessToken));
        } else if(startDate && endDate) {
            ({ emailTotalCount, cacheKey } = await gmailService.getEmailsBySenderWDateRange(email, sender, filter, startDate, endDate, accessToken));
        }
        res.status(200).json({ emailTotalCount, cacheKey} );
    } catch (error) {
        console.error('Error fetching emails by sender:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Get Labels
export const getLabels = async (req, res) => {
    try {
        console.log('Fetching labels for user:', req.query);
        const { emailAddress, accessToken } = req.query;
        const labels = await gmailService.getLabels(emailAddress, accessToken);
        res.status(200).json(labels);
    } catch (error) {
        console.error('Error fetching labels:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Get Emails by Label
export const getEmailsByLabel = async (req, res) => {
    try {
        const { email, label, accessToken } = req.query;
        const { emailTotalCount, cacheKey} = await gmailService.getEmailsByLabel(email, label, accessToken);
        res.status(200).json(emailDetails);
    } catch (error) {
        console.error('Error fetching emails by label:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Batch Delete Emails (Just needs an array of email IDs)
export const batchDeleteEmails = async (req, res) => {
    try {
        console.log('Batch deleting emails for user:', req.query);
        const { emailAddress, accessToken, cacheKey } = req.query;
        const response = await gmailService.batchDeleteEmails(emailAddress, accessToken, cacheKey);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error batch deleting emails:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}