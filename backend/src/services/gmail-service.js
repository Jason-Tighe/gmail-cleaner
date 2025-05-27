export default class GmailService {
    constructor() {
        this.baseUrl = 'https://gmail.googleapis.com';
    }

    // Example method to fetch emails
    async getEmails(email, accessToken) {
        console.log('getEmails:', email);
        try {
            const emails = [];
            const response = await fetch(`${this.baseUrl}/gmail/v1/users/${email}/messages`, {
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
            return data;
        } catch (error) {
            console.error('Error fetching emails:', error);
            return undefined;
        }
    }

}