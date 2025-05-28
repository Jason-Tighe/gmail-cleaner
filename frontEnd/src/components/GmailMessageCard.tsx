import React, { useEffect, useState, type JSX } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface EmailHeader {
  name: string;
  value: string;
}

interface EmailPayload {
  headers: EmailHeader[];
  parts?: Array<{
    mimeType: string;
    body: { data?: string };
  }>;
}

interface Email {
  id: string;
  snippet: string;
  internalDate: string;
  payload: EmailPayload;
}

export default function GmailMessageCard(): JSX.Element {
  const { user } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'date',
    direction: 'desc',
  });
  const sortedEmails = [...emails].sort((a, b) => {
    const aValue = a.payload.headers.find(h => h.name.toLowerCase() === sortConfig.key)?.value || '';
    const bValue = b.payload.headers.find(h => h.name.toLowerCase() === sortConfig.key)?.value || '';
    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc'
        ? new Date(a.internalDate).getTime() - new Date(b.internalDate).getTime()
        : new Date(b.internalDate).getTime() - new Date(a.internalDate).getTime();
    }
    return sortConfig.direction === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  useEffect(() => {
    const fetchEmails = async () => {
      if (!user?.email || !user?.accessToken) {
        setError('User credentials missing');
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get<Email[]>('/api/gmail/email', {
          params: { 
            email: user.email, 
            accessToken: user.accessToken 
          },
        });
        setEmails(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to fetch emails');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [user?.email, user?.accessToken]);

  const getHeaderValue = (headers: EmailHeader[], name: string): string => {
    return headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || '';
  };

  const formatDate = (timestamp: string): string => {
    return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text: string, length = 40): string => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };



if (loading) {
    return (
        <div className="p-4 text-center">
            <div className="flex justify-center items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-150"></div>
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-300"></div>
            </div>
            <p className="mt-2 text-gray-500">Loading emails...</p>
        </div>
    );
}
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!emails.length) return <div className="p-4 text-center">No emails found</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('from')}
              >
                From
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('subject')}
              >
                Subject
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('snippet')}
              >
                Snippet
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedEmails.map((email) => (
              <tr key={email.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getHeaderValue(email.payload.headers, 'From').replace(/<[^>]*>/g, '').trim()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {truncateText(getHeaderValue(email.payload.headers, 'Subject'))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {truncateText(email.snippet)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(email.internalDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}