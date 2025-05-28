import e from 'express';
import gmail from 'googleapis'
import { jwtDecode } from 'jwt-decode';


export default class GmailService {
    constructor() {
        this.baseUrl = 'https://gmail.googleapis.com';
    }

    async checkTokenValidity(accessToken) {
        try {
          const response = await fetch('https://www.googleapis.com/oauth2/v3/tokeninfo', {
            method: 'POST',
            body: new URLSearchParams({ access_token: accessToken }),
          });
          const data = await response.json();
          console.log('Token Info:', data);
          return data;
        } catch (error) {
          console.error('Token validation failed:', error);
          return null;
        }
      }

    async getEmails(email, accessToken) {
        try {
          const response = await fetch(`${this.baseUrl}/gmail/v1/users/me/messages?maxResults=10`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          console.log('Full API Response:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
          });


          if (!response.ok) {
            const errorData = await response.json(); // Parse error body
            throw new Error(`Gmail API Error: ${JSON.stringify(errorData)}`);
            }
          const data = await response.json();
          console.log('Fetched emails:', data);
          return data.messages || [];
        } catch (error) {
          console.error('Error fetching emails:', error);
          return [];
        }
      }
      
      async getEmailsByYear(email, accessToken, year) {
        try {
            const response = await fetch(`${this.baseUrl}/gmail/v1/users/me/messages?q=after:${year}-01-01 before:${year + 1}-01-01`, {
                method: 'GET',
                headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
                }
            });
    
            console.log('Full API Response:', {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Parse error body
                throw new Error(`Gmail API Error: ${JSON.stringify(errorData)}`);
            }
            const data = await response.json();
            console.log('Fetched emails by year:', data);
            return data.messages || [];
        }  catch (error) {
          console.error('Error fetching emails by year:', error);
          return [];
        } 
      }

      async describeEmail(emailAddress, emails, accessToken) {
        try {
          const emailsWithDetails = [];
          for (const email of emails) {
            console.log('Describing email:', email.id);
            const response = await fetch(`${this.baseUrl}/gmail/v1/users/me/messages/${email.id}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              }
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            emailsWithDetails.push(data);
          }
          return emailsWithDetails; // ✅ fix
        } catch (error) {
          console.error('Error describing email:', error);
          return [];
        }
      }


    async batchDeleteEmails(email, accessToken, messageIds) {
        console.log('batchDeleteEmails:', email, messageIds);
        try {
            const response = await fetch(`${this.baseUrl}/gmail/v1/users/me/messages/batchDelete`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: messageIds })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return { success: true };
        } catch (error) {
            console.error('Error deleting emails:', error);
            return { success: false, message: error.message };
        }
    }

}