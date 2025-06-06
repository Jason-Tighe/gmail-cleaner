/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DatePicker from "./DatePicker";
import Dropdown from "./DropDown";
import Delete from "./Delete";
import { useAuth } from "../context/AuthContext";
import RangeFilter from "./RangeFitler";
import qs from "qs";

type EmailResponse = {
  emailTotalCount: number;
  cacheKey: string;
};

type GmailLabel = {
  id: string;
  name: string;
};

export default function ByAdvancedFilters() {
  const { user } = useAuth();
  const [labels, setLabels] = useState<GmailLabel[]>([]);
  const [dateRangeEnabled, setDateRangeEnabled] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [hasAttachment, setHasAttachment] = useState(false);
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [label, setLabel] = useState<string[]>([]);
  const [emailCount, setEmailCount] = useState<number | null>(null);
  const [cacheKey, setCacheKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sizeRange, setSizeRange] = useState<[number, number]>([50000, 500000]);
  const [labelMatch, setLabelMatch] = useState<"AND" | "OR">("AND");
  const hasFetched = useRef(false);

  // const formatBytes = (bytes: number) => {
  //   if (bytes === 0) return "0 Bytes";
  //   const k = 1024;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  // };

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

  const loadEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<EmailResponse>("/api/gmail/email/advanced", {
        headers: {
          Authorization: `Bearer ${user?.accessToken ?? localStorage.getItem("accessToken")}`,
        },
        params: {
          email: user?.email ?? localStorage.getItem("email"),
          startDate: dateRangeEnabled ? startDate : undefined,
          endDate: dateRangeEnabled ? endDate : undefined,
          filter,
          hasAttachment,
          smallerThan: sizeRange[1],
          largerThan: sizeRange[0],
          from,
          subject,
          labelIds: label,
          labelMatch
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });

      setCacheKey(response.data.cacheKey);
      setEmailCount(response.data.emailTotalCount);
    } catch {
      setError("Failed to load email count.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
        <Dropdown
          label="Filter by Date: "
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          label="Start Date:"
          date={startDate}
          onChange={setStartDate}
          disabled={!dateRangeEnabled}
          textSize="text-sm"
          labelPosition="inline"
        />
        <DatePicker
          label="End Date:"
          date={endDate}
          onChange={setEndDate}
          disabled={!dateRangeEnabled}
          textSize="text-sm"
          labelPosition="inline"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <input
            type="email"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="e.g., example@gmail.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Weekly Report"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
          />
        </div>
      </div>
      <div className="flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="labelMatchAnd"
            value="AND"
            checked={labelMatch === "AND"}
            onChange={() => setLabelMatch("AND")}
            className="text-blue-600"
          />
          <label htmlFor="labelMatchAnd" className="text-sm font-medium text-gray-700">
            Match <strong>ALL</strong> labels (AND)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="labelMatchOr"
            value="OR"
            checked={labelMatch === "OR"}
            onChange={() => setLabelMatch("OR")}
            className="text-blue-600"
          />
          <label htmlFor="labelMatchOr" className="text-sm font-medium text-gray-700">
            Match <strong>ANY</strong> label (OR)
          </label>
        </div>
      </div>

      <div>
        <Dropdown
          label="Label:"
          value={label}
          onChange={(val) => {
            if (typeof val === "string") {
              setLabel([val]);
            } else {
              setLabel(val);
            }
          }}
          options={labels.map((lbl) => ({
            label: lbl.name,
            value: lbl.id,
          }))}
          inputType="multiple"
        />
      </div>

      <div className="flex items-center space-x-4">
        <RangeFilter values={sizeRange} setValues={setSizeRange} />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="hasAttachment"
            checked={hasAttachment}
            onChange={(e) => setHasAttachment(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded "
          />
          <label htmlFor="hasAttachment" className="text-sm font-medium text-gray-700">
            Has Attachment
          </label>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 flex space-x-4">
        <button
          onClick={loadEmails}
          className="flex-1 py-3 bg-blue-600 text-white rounded-md text-center text-lg font-semibold hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Load Emails"}
        </button>
        <Delete
          cacheKey={cacheKey}
          disabled={!cacheKey || emailCount === 0 || loading}
          onSuccess={() => {
            alert("Emails deleted successfully.");
            setEmailCount(0);
            setCacheKey(null);
          }}
          onError={(err) => setError(err)}
          label="Delete Emails"
        />
      </div>

      {emailCount !== null && (
        <p className="text-center text-gray-700 mt-2">
          Emails matching filters: <span className="font-semibold">{emailCount}</span>
        </p>
      )}
      {error && <p className="text-center text-red-500 mt-2">{error}</p>}
    </div>
  );
}
