import e from 'express';
import gmail from 'googleapis'
import { jwtDecode } from 'jwt-decode';
import {
    setCache,
    getCache,
    clearCache,
    estimateCacheSize
} from '../utils/cache.js';


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
              Authorization: `${accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          console.log('Full API Response:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
          });


          if (!response.ok) {
            const errorData = await response.json();
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
      
      async getEmailsByYear(email, accessToken, year, filter) {
        const allMessages = [];
        let nextPageToken = null;

        const start = `${year}-01-01`;
        const end = `${year + 1}-01-01`;

        let query = `after:${start} before:${end}`;
        if (filter === 'unread') {
            query += ' is:unread';
        } else if (filter === 'read') {
            query += ' -is:unread';
        }
        console.log('getEmailsByYear Query:', query);

        try {
            do {
                const url = new URL(`${this.baseUrl}/gmail/v1/users/me/messages`);
                url.searchParams.append("q", query);
                if (nextPageToken) {
                    url.searchParams.append("pageToken", nextPageToken);
                }

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        Authorization: `${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Gmail API Error: ${JSON.stringify(errorData)}`);
                }
    
                const data = await response.json();
                const ids = (data.messages || []).map(msg => msg.id);

                allMessages.push(...ids);
                nextPageToken = data.nextPageToken;
                
            } while (nextPageToken);
            
            const emailTotalCount = allMessages.length;
            const cacheKey = `emails_${email}_${year}_${filter}`; 
            
            await setCache(cacheKey, allMessages, 3600000);
            const cachedData = await getCache(cacheKey);
            console.log('cachedData:', cachedData);
           
            console.log('Fetched emails by year:', emailTotalCount);
            return { cacheKey, emailTotalCount };
        } catch (error) {
            console.error('Error fetching emails by year:', error);
            return [];
        }
      }

      async getEmailsByDateRange(email, accessToken, startDate, endDate, filter) {
        const allMessages = [];
        let nextPageToken = null;

        let query = `after:${startDate} before:${endDate}`;
        if (filter === 'unread') {
            query += ' is:unread';
        } else if (filter === 'read') {
            query += ' -is:unread';
        }
        console.log('getEmailsByDateRange Query:', query);

        try {
            do {
                const url = new URL(`${this.baseUrl}/gmail/v1/users/me/messages`);
                url.searchParams.append("q", query);
                if (nextPageToken) {
                    url.searchParams.append("pageToken", nextPageToken);
                }

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        Authorization: `${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Gmail API Error: ${JSON.stringify(errorData)}`);
                }
    
                const data = await response.json();
                const ids = (data.messages || []).map(msg => msg.id);

                allMessages.push(...ids);
                nextPageToken = data.nextPageToken;
                
            } while (nextPageToken);
            
            console.log('Fetched emails by date range:', allMessages.length);
            const emailTotalCount = allMessages.length;
            const cacheKey = `emails_${email}_${startDate}_${endDate}_${filter}`; 
            
            await setCache(cacheKey, allMessages, 3600000);
            
            return { cacheKey, emailTotalCount };
        } catch (error) {
            console.error('Error fetching emails by date range:', error);
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
                Authorization: `${accessToken}`,
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

      // I guess should also offer a date range option
      async getEmailsBySenderWDateRange(email, senders, filter, startDate, endDate, accessToken) {
        const allMessages = [];
        let nextPageToken = null;

        let query = Array.isArray(senders) && senders.length > 1 
          ? senders.map(sender => `from:${sender}`).join(' OR ') 
          : `from:${senders[0]}`;

        query += ` after:${startDate} before:${endDate}`;

        if (filter === 'unread') {
          query += ' is:unread';
        } else if (filter === 'read') {
          query += ' -is:unread';
        }

        console.log('getEmailsBySenderWDateRange Query:', query);

        if (query.length > 2048) {
          throw new Error('Query string exceeds the maximum allowed length of 2048 characters.');
        }

        try {
        do {
            const url = new URL(`${this.baseUrl}/gmail/v1/users/me/messages`);
            url.searchParams.append("q", query);
            if (nextPageToken) {
              url.searchParams.append("pageToken", nextPageToken);
            }
            const response = await fetch(url.toString(), {
              method: 'GET',
              headers: {
              Authorization: `${accessToken}`,
              'Content-Type': 'application/json'
            }
            });
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`Gmail API Error: ${JSON.stringify(errorData)}`);
            }
            const data = await response.json();
            const ids = (data.messages || []).map(msg => msg.id);
            allMessages.push(...ids);
            nextPageToken = data.nextPageToken;
        } while (nextPageToken);

          const emailTotalCount = allMessages.length;
          const cacheKey = `emails_${email}_${senders.join('_')}_${startDate}_${endDate}_${filter}`;
          await setCache(cacheKey, allMessages, 3600000);
          return { cacheKey, emailTotalCount };
        } catch (error) {
        console.error('Error fetching emails by sender with date range:', error);
        return [];
        }   
      }


    async getEmailsBySender(email, senders, filter, accessToken) {
      let nextPageToken = null;
      const allMessages = [];
      try {
      let query = Array.isArray(senders) && senders.length > 1 
        ? senders.map(sender => `from:${sender}`).join(' OR ') 
        : `from:${senders[0]}`;

      if (filter === 'unread') {
        query += ' is:unread';
      } else if (filter === 'read') {
        query += ' -is:unread';
      }

      console.log('Query in getEmailBySender:', query);

      if (query.length > 2048) {
        throw new Error('Query string exceeds the maximum allowed length of 2048 characters.');
      }

      do {
        const url = new URL(`${this.baseUrl}/gmail/v1/users/me/messages`);
        url.searchParams.append("q", query);
        if (nextPageToken) {
          url.searchParams.append("pageToken", nextPageToken);
        }
        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            Authorization: `${accessToken}`,
            'Content-Type': 'application/json'
        }
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Gmail API Error: ${JSON.stringify(errorData)}`);
        }
        const data = await response.json();
        const ids = (data.messages || []).map(msg => msg.id);
        allMessages.push(...ids);
        nextPageToken = data.nextPageToken;

      } while (nextPageToken);

        const emailTotalCount = allMessages.length;
        const cacheKey = `emails_${email}_${senders.join('_')}`;
        await setCache(cacheKey, allMessages, 3600000);
        console.log('Fetched emails by sender:', emailTotalCount);
        return { emailTotalCount, cacheKey };
      } catch (error) {
        console.error('Error fetching emails by sender:', error);
        return [];
      }
    }

    async getLabels(emailAddress, accessToken) {
      let labels = [];
      try {
        const response = await fetch(`${this.baseUrl}/gmail/v1/users/me/labels`, {
          method: 'GET',
          headers: {
            Authorization: `${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Gmail API Error: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        labels = (data.labels || []).map(label => ({
          id: label.id,
          name: label.name,
        }));

        console.log('Fetched labels:', labels);
        return labels;
      } catch (error) {
        console.error('Error fetching labels:', error);
        return [];
      }
    }

      async fetchEmailsByLabels(email, labels, filter, startDate, endDate, accessToken) {
        try{
            let nextPageToken = null;
            const allMessages = [];
            let query = `after:${startDate} before:${endDate}`;

            if (filter === 'unread') {
                query += ' is:unread';
            } else if (filter === 'read') {
                query += ' -is:unread';
            }


            console.log('Query in fetchEmailsByLabels:', query);

            do {
                const url = new URL(`${this.baseUrl}/gmail/v1/users/me/messages`);
                url.searchParams.append("q", query);
                if (nextPageToken) {
                    url.searchParams.append("pageToken", nextPageToken);
                }

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        Authorization: `${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Gmail API Error: ${JSON.stringify(errorData)}`);
                }

                const data = await response.json();
                const ids = (data.messages || []).map(msg => msg.id);
                allMessages.push(...ids);
                nextPageToken = data.nextPageToken;

            } while (nextPageToken);

            const emailTotalCount = allMessages.length;
            const cacheKey = `emails_${email}_${labels.join('_')}_${startDate}_${endDate}_${filter}`;
            await setCache(cacheKey, allMessages, 3600000);

            console.log('Fetched emails by label:', allMessages.length);
            return allMessages;
        } catch (error) {
            console.error('Error fetching emails by label:', error);
            return [];
        }
      }


      async batchDeleteEmails(email, accessToken, cacheKey) {
        try {
            const cachedData = await getCache(cacheKey);
            const response = await fetch(`${this.baseUrl}/gmail/v1/users/me/messages/batchDelete`, {
                method: 'POST',
                headers: {
                    Authorization: `${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: cachedData })
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