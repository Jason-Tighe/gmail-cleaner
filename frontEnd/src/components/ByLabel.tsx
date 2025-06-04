import { useEffect, useRef, useState } from "react";
import Label from "./Label";
import DatePicker from "./DatePicker"; // Assuming you have a DatePicker component
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./DropDown";

type GmailLabel = {
    id: string;
    name: string;
};

type EmailResponse = {
    emailTotalCount: number;
    cacheKey: string;
};

export default function ByLabel() {
    const [labels, setLabels] = useState<GmailLabel[]>([]);
    const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([]);
    const [emailCount, setEmailCount] = useState<number | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dateRangeEnabled, setDateRangeEnabled] = useState(false);
    const [emailFilter, setEmailFilter] = useState<"unread" | "read" | "all">("all");
    const { user } = useAuth();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        if (!user?.email || !user?.accessToken) return;

        hasFetched.current = true;

        const fetchLabels = async () => {
            try {
                const response = await axios.get<GmailLabel[]>("/api/gmail/email/labels", {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken ?? localStorage.getItem("accessToken")}`,
                    },
                    params: { email: user?.email },
                });
                console.log("Labels fetched:", response.data);
                setLabels(response.data);
            } catch (error) {
                console.error("Error fetching labels:", error);
            }
        };

        fetchLabels();
    }, [user?.email, user?.accessToken]);

    const handleFetchEmails = async () => {
        try {
            const response = await axios.get<EmailResponse>("/api/gmail/email/by-labels", {
                headers: {
                    Authorization: `Bearer ${user?.accessToken ?? localStorage.getItem("accessToken")}`,
                },
                params: {
                    email: user?.email ?? localStorage.getItem("email"),
                    labelIds: selectedLabelIds,
                    startDate,
                    endDate,
                    filter: emailFilter,
                },
            });
            setEmailCount(response.data.emailTotalCount);
        } catch (error) {
            console.error("Error fetching emails by labels:", error);
        }
    };

    const handleClearSelection = () => {
        setSelectedLabelIds([]);
        setEmailCount(null);
        setStartDate("");
        setEndDate("");
        setDateRangeEnabled(false);
        setEmailFilter("all");
    };

    return (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 flex flex-col space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Filter by Labels</h2>
    
            {/* Label Selection */}
            <div>
                <Label
                    labels={labels}
                    selected={selectedLabelIds}
                    onSelect={setSelectedLabelIds}
                />
            </div>
    
            {/* Date Filter & Status */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                <Dropdown
                    label="Filter by Date:"
                    value={dateRangeEnabled ? "range" : "all"}
                    onChange={(val) => setDateRangeEnabled(val === "range")}
                    options={[
                        { label: "All Time", value: "all" },
                        { label: "Date Range", value: "range" },
                    ]}
                />
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <label className="block text-m text-gray-700 font-bold">Email Status:</label>
                    <div className="flex space-x-4">
                        {["all", "read", "unread"].map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value={option}
                                    checked={emailFilter === option}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onChange={() => setEmailFilter(option as any)}
                                />
                                <span className="capitalize">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
    
            {/* Date Pickers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                    label="Start Date"
                    date={startDate}
                    onChange={setStartDate}
                    disabled={!dateRangeEnabled}
                    textSize="text-sm"
                    labelPosition="inline"
                />
                <DatePicker
                    label="End Date"
                    date={endDate}
                    onChange={setEndDate}
                    disabled={!dateRangeEnabled}
                    textSize="text-sm"
                    labelPosition="inline"
                />
            </div>
    
            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-200 flex space-x-4">
                <button
                    onClick={handleFetchEmails}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-md text-center text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={selectedLabelIds.length === 0}
                >
                    Fetch Emails
                </button>
                <button
                    onClick={handleClearSelection}
                    className="flex-1 py-3 bg-gray-600 text-white rounded-md text-center text-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Clear Selection
                </button>
            </div>
    
            {/* Email Count */}
            {emailCount !== null && (
                <p className="mt-4 text-lg text-green-700 font-medium">
                    Found {emailCount} emails with selected labels.
                </p>
            )}
        </div>
    );
    
}
