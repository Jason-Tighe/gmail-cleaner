import { gmail } from 'googleapis/build/src/apis/gmail/index.js';
import GmailService from '../services/gmail-service.js';

const gmailService = new GmailService();

// An issue i'm going to have is that aside from the general email fetching, the others really don't need the Id's or info from the response. Like there's no need to send them to the frontend only to send them back to the backend, so i need to think of something else.
// Cache the array of email Ids probably that way we can just sent the count to the frontend and then we'll grab the Id's from the cache to batchDelete them? Maybe a different option if that makes sense it really only has to be temporary, like just when they're on the endpoint

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
        console.log('Fetching emails by year for user:', req.params);
        console.log('Query Parameters:', req.query);
        console.log('Headers:', req.headers);
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

export const getEmailsByDateRange = async (req, res) => {
    try {
        console.log('Fetching emails by year for user:', req.query);
        const { email, startDate, endDate, filter } = req.query;
        const accessToken  = req.headers.authorization
        const { cacheKey, emailTotalCount } = await gmailService.getEmailsByDateRange(email, accessToken, startDate, endDate, filter);
        res.status(200).json({ cacheKey, emailTotalCount });
    } catch (error) {
        console.error('Error fetching emails by year:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

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