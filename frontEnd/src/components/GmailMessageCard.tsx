/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, type JSX } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
 

export default function GmailMessageCard (): JSX.Element {
    const { user } = useAuth();
    console.log('User:', user);


    const [emailData, setEmailData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmailData = async () => {
            try {
                const response = await axios.get(`/api/gmail/email`, {
                    params: { email: user?.email, accessToken: user?.accessToken },
                });
                
                setEmailData(response.data);
            } catch (err) {
                setError('Failed to fetch email data');
            } finally {
                setLoading(false);
            }
        };

        fetchEmailData();
    }, [user?.email, user?.accessToken]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="gmail-message-card">
            <h2>{emailData.subject}</h2>
            <p>{emailData.body}</p>
            <small>From: {emailData.sender}</small>
        </div>
    );
};

