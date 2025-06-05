import { useEffect, useRef, useState } from "react";
import Label from "./Label";
import DatePicker from "./DatePicker"; // Assuming you have a DatePicker component
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./DropDown";
import qs from "qs";
import Delete from "./Delete";

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
    const [deleteEnabled, setDeleteEnabled] = useState(false); // New state for delete button
    const { user } = useAuth();
    const hasFetched = useRef(false);
    const accessToken = user?.accessToken || localStorage.getItem("accessToken");
    const [cacheKey, setCacheKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        if (hasFetched.current) return;
        if (!user?.email || !user?.accessToken) return;

        hasFetched.current = true;

        const fetchLabels = async () => {
            setError(null);
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
                setError("Failed to fetch email count.");
                console.error("Error fetching labels:", error);
            }
        };

        fetchLabels();
    }, [user?.email, user?.accessToken]);

    const handleFetchEmails = async () => {
        try {
            const response = await axios.get<EmailResponse>("/api/gmail/email/by-labels", {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                    email: user?.email ?? localStorage.getItem("email"),
                    labelIds: selectedLabelIds,
                    startDate,
                    endDate,
                    filter: emailFilter,
                },
                paramsSerializer: (params) => {
                    return qs.stringify(params, { arrayFormat: "repeat" });
                },
            });
            setEmailCount(response.data.emailTotalCount);
            setCacheKey(response.data.cacheKey);
            setDeleteEnabled(true); 
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
        setDeleteEnabled(false);
        setError(null);
    };


    return (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 flex flex-col space-y-6">

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
                Load Emails
            </button>
            <button
                onClick={handleClearSelection}
                className="flex-1 py-3 bg-gray-600 text-white rounded-md text-center text-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                Clear Selection
            </button>
            <Delete
                cacheKey={cacheKey}
                emailCount={emailCount}
                disabled={!deleteEnabled}
                onSuccess={() => {
                    setEmailCount(0);
                }}
                onError={(msg) => setError(msg)}
            />

            </div>
            {error && (
            <div className="text-red-600 bg-red-100 p-3 rounded border border-red-400">
                {error}
            </div>
            )}
        </div>
    );
}
