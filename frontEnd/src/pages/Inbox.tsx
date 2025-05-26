import { useState } from "react";

export default function Inbox() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const emails = [
        { id: 1, subject: "Welcome to Gmail Cleaner!", sender: "support@gmailcleaner.com", time: "10:30 AM" },
        { id: 2, subject: "Your Weekly Report", sender: "reports@gmailcleaner.com", time: "9:15 AM" },
        { id: 3, subject: "Meeting Reminder", sender: "calendar@gmailcleaner.com", time: "8:00 AM" },
    ];

    return (
        <div className="bg-white-500">
            <button onClick={() => setIsModalOpen(true)}>Open Inbox</button>

            {isModalOpen && (
            <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="modal-content bg-white p-6 rounded shadow-lg w-1/3">
                <button
                    className="close-button text-gray-500 hover:text-gray-700 float-right"
                    onClick={() => setIsModalOpen(false)}
                >
                    &times;
                </button>
                <h1 className="text-xl font-bold mb-4">Inbox</h1>
                <ul className="email-list">
                    {emails.map(email => (
                    <li key={email.id} className="email-item border-b py-2">
                        <div className="email-sender font-semibold">{email.sender}</div>
                        <div className="email-subject text-gray-700">{email.subject}</div>
                        <div className="email-time text-sm text-gray-500">{email.time}</div>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            )}
        </div>
    );
}