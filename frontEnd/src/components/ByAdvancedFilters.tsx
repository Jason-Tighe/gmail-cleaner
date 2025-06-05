/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DatePicker from "./DatePicker";
import Dropdown from "./DropDown";

export default function ByAdvancedFilters() {
  const [dateRangeEnabled, setDateRangeEnabled] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [hasAttachment, setHasAttachment] = useState(false);
  const [largerThan, setLargerThan] = useState(500000);
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [label, setLabel] = useState("");

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 flex flex-col space-y-6">
      {/* Top Filters */}
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

        <div className="flex items-center space-x-4">
          <label className="block text-m text-gray-700 font-bold">Email Status:</label>
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

      {/* Other Fields */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="from" className="block text-sm font-medium text-gray-700">
            From
          </label>
          <input
            type="email"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="e.g., tighe59@gmail.com"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="label" className="block text-sm font-medium text-gray-700">
            Label
          </label>
          <select
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Label</option>
            <option value="STARRED">STARRED</option>
            <option value="IMPORTANT">IMPORTANT</option>
            <option value="SPAM">SPAM</option>
          </select>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., meeting"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label htmlFor="larger" className="block text-sm font-medium text-gray-700">
              Larger Than
            </label>
            <input
              type="range"
              id="larger"
              min="0"
              max="1000000"
              step="10000"
              value={largerThan}
              onChange={(e) => setLargerThan(Number(e.target.value))}
              className="mt-1 w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              Selected: {largerThan.toLocaleString()} bytes ({formatBytes(largerThan)})
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasAttachment"
              checked={hasAttachment}
              onChange={(e) => setHasAttachment(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="hasAttachment" className="text-sm font-medium text-gray-700">
              Has Attachment
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-gray-200 flex space-x-4">
        <button
          onClick={() => alert("Load logic to be implemented")}
          className="flex-1 py-3 bg-blue-600 text-white rounded-md text-center text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Load Emails
        </button>
        <button
          onClick={() => alert("Delete logic to be implemented")}
          className="flex-1 py-3 bg-red-600 text-white rounded-md text-center text-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Emails
        </button>
      </div>
    </div>
  );
}
