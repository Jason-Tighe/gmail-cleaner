import { useEffect } from 'react';
import axios from 'axios';



export default function ByYear({ year, startDate, endDate }: { year?: string, startDate?: string, endDate?: string }) {
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                if (year) {
                    console.log('Fetching emails by year...');
                    const response = await axios.get(`/email/year`, { params: { year } });
                    console.log('Emails by year:', response.data);
                } else if (startDate && endDate) {
                    console.log('Fetching emails by date range...');
                    const response = await axios.get(`/email/date-range`, { params: { startDate, endDate } });
                    console.log('Emails by date range:', response.data);
                }
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };

        fetchEmails();
    }, [year, startDate, endDate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">By Year Page</h1>
            {year ? (
                <p className="text-lg">This is the by year page for the year {year}.</p>
            ) : (
                <p className="text-lg">
                    This is the by date range page for dates between {startDate} and {endDate}.
                </p>
            )}
        </div>
    );
}