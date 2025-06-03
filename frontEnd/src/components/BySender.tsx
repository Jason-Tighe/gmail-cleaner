/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DatePicker from "./DatePicker";
import SenderInput from "./SenderInput";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import qs from "qs";

type EmailResponse = {
    emailTotalCount: number;
    cacheKey: string;
};

export default function BySender() {
    const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
    const [dateRangeEnabled, setDateRangeEnabled] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sender, setSenders] = useState<string[]>([""]);
    const [emailTotalCount, setemailTotalCount] = useState<number | null>(null);
    const [cacheKey, setCacheKey] = useState<string | null>(null);
    const { user } = useAuth();

    const handleSenderChange = (index: number, value: string) => {
        const updated = [...sender];
        updated[index] = value;
        setSenders(updated);
    };

    const addSenderInput = () => {
        setSenders([...sender, ""]);
    };

    const removeSenderInput = (index: number) => {
        const updated = sender.filter((_, i) => i !== index);
        setSenders(updated);
    };

    const handleLoadEmails = async () => {
        try {
            const params = new URLSearchParams();
            const accessToken = user?.accessToken || localStorage.getItem("accessToken");

            if (!accessToken) {
                alert("No access token found");
                return;
            }

            const userEmail = user?.email || localStorage.getItem("userEmail");
            if (!userEmail) {
                alert("No user email found");
                return;
            }

            params.append("email", userEmail);
            params.append("filter", filter);

            if (dateRangeEnabled) {
                if (!startDate || !endDate) {
                    alert("Start and end date required when date range is enabled");
                    return;
                }
                params.append("startDate", startDate);
                params.append("endDate", endDate);
            }

            sender
                .filter((s) => s.trim() !== "")
                .forEach((s) => params.append("sender", s.trim()));

            if (sender.length === 0) {
                alert("At least one sender is required");
                return;
            }

            const response = await axios.get<EmailResponse>("/api/gmail/email/sender", {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                    email: userEmail,
                    sender: sender.filter((s) => s.trim() !== ""),
                    startDate,
                    endDate,
                    filter,
                },
                paramsSerializer: (params) => {
                    return qs.stringify(params, { arrayFormat: "repeat" });
                },
            });

            if (!response.data) {
                throw new Error("Failed to fetch emails");
            }

            const { emailTotalCount, cacheKey } = response.data;
            setemailTotalCount(emailTotalCount);
            setCacheKey(cacheKey);
        } catch (error: any) {
            console.error("Error loading emails:", error);
            alert("Failed to load emails");
        }
    };

    const handleDeleteEmails = () => {
        if (!cacheKey) return;
        alert(`Deleted ${emailTotalCount} emails with key ${cacheKey}`);
    };

    return (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 flex flex-col space-y-6">
            {/* Date Range Toggle */}
            <div className="flex items-center space-x-4">
                <label className="text-m font-medium text-gray-700">Filter by Date:</label>
                <select
                    value={dateRangeEnabled ? "range" : "all"}
                    onChange={(e) => setDateRangeEnabled(e.target.value === "range")}
                    className="border border-gray-300 rounded px-2 py-1"
                >
                    <option value="all">All Time</option>
                    <option value="range">Date Range</option>
                </select>
            </div>

            {/* Date Pickers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                    label="Start Date"
                    date={startDate}
                    onChange={setStartDate}
                    disabled={!dateRangeEnabled}
                />
                <DatePicker
                    label="End Date"
                    date={endDate}
                    onChange={setEndDate}
                    disabled={!dateRangeEnabled}
                />
            </div>

            {/* Read/Unread Filter */}
            <div className="flex flex-col items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Status</label>
                <div className="flex space-x-4">
                    {["all", "read", "unread"].map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value={option}
                                checked={filter === option}
                                onChange={() => setFilter(option as any)}
                            />
                            <span className="capitalize">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Sender Inputs Section */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Senders</label>
                <div className="max-h-56 overflow-y-auto pr-2">
                    {sender.map((sender, index) => (
                        <div key={index} className="flex items-end space-x-2 w-full mb-4">
                            <SenderInput
                                value={sender}
                                label={index === 0 ? "" : "OR"}
                                onChange={(val) => handleSenderChange(index, val)}
                            />
                            <button
                                type="button"
                                onClick={() => removeSenderInput(index)}
                                className="h-[42px] px-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <i className="fas fa-trash-alt"></i>
                                <span className="sr-only">Delete Sender</span>
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addSenderInput}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                >
                    + Add another sender
                </button>
            </div>

            {/* Load/Delete Buttons */}
            <div className="pt-4 border-t border-gray-200 flex space-x-4">
                <button
                    onClick={handleLoadEmails}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-md text-center text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Load Emails
                </button>
                <button
                    onClick={handleDeleteEmails}
                    disabled={emailTotalCount === null}
                    className={`flex-1 py-3 rounded-md text-center text-lg font-semibold focus:outline-none focus:ring-2 ${
                        emailTotalCount === null
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                    }`}
                >
                    Delete All Emails ({emailTotalCount ?? 0})
                </button>
            </div>
        </div>
    );
}
