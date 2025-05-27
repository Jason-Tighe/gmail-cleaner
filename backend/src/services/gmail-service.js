export default class GmailService {
    constructor() {
        // Initialization logic if needed
    }

    // Example method to fetch emails
    async getEmails(user) {
        try {
            const emails = [];
            const response = await fetch(`${this.baseUrl}/gmail/v1/users/${user.email}/messages`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Response from Gmail API:', response);
            const data = await response.json();
            return emails;
        } catch (error) {
            console.error('Error fetching emails:', error);
            return undefined;
        }
    }

}