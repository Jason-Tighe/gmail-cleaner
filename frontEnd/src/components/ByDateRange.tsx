import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DatePicker from "./DatePicker";

type EmailResponse = {
  emailTotalCount: number;
  cacheKey: string;
};

export default function ByDateRange({ onBack }: { onBack: () => void }) {
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [emailCount, setEmailCount] = useState<number | null>(null);
  const [cacheKey, setCacheKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (!submitted || !startDate || !endDate) return;

    const fetchEmailCount = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<EmailResponse>("/api/gmail/email/date-range", {
          headers: {
            Authorization: `Bearer ${user?.accessToken ?? localStorage.getItem("accessToken")}`,
          },
          params: {
            email: user?.email ?? localStorage.getItem("email"),
            startDate,
            endDate,
            filter,
          },
        });

        setCacheKey(response.data.cacheKey);
        setEmailCount(response.data.emailTotalCount);
      } catch {
        setError("Failed to fetch email count.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmailCount();
  }, [submitted, startDate, endDate, filter, user]);

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete all these emails?")) return;

    setDeleting(true);
    setError(null);
    try {
      await axios.delete("/email/date-range", {
        headers: {
          Authorization: `Bearer ${user?.accessToken ?? localStorage.getItem("accessToken")}`,
        },
        params: { cacheKey },
      });

      setEmailCount(0);
      alert("Emails deleted successfully.");
      handleBackClick();
    } catch {
      setError("Failed to delete emails.");
    } finally {
      setDeleting(false);
    }
  };

  const handleBackClick = () => {
    setStartDate("");
    setEndDate("");
    setFilter("all");
    setEmailCount(null);
    setSubmitted(false);
    setPage(0);
    onBack();
  };

 
  return (
    <div className="relative bg-white rounded-lg shadow-lg h-[280px] overflow-hidden transition-transform duration-500 ease-in-out">
    <div
      className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${page * 100}%)` }}
    >
      {/* Page 0: Start */}
      <div className="flex-[0_0_100%] flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl mt-8 font-semibold ml-4 text-gray-800">Custom Date Range</h2>
        <div className="mt-auto w-full">
          <button
            onClick={() => setPage(1)}
            className="w-full py-4 bg-blue-500 text-white text-sm font-medium hover:bg-blue-600"
          >
            Start
          </button>
        </div>
      </div>

      {/* Page 1: Start Date */}
      <div className="flex-[0_0_100%] flex flex-col items-center justify-center h-full">
        <DatePicker label="Start Date" date={startDate} onChange={setStartDate} />
        <div className="mt-auto w-full flex">
          <button
            onClick={() => setPage(0)}
            className="flex-1 py-4 bg-amber-500 text-white hover:bg-amber-600 text-sm"
          >
            ← Back
          </button>
          <button
            onClick={() => setPage(2)}
            disabled={!startDate}
            className="flex-1 py-4 bg-blue-500 text-white hover:bg-blue-600 text-sm disabled:bg-gray-300"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Page 2: End Date */}
      <div className="flex-[0_0_100%] flex flex-col items-center justify-center h-full">
        <DatePicker label="End Date" date={endDate} onChange={setEndDate} />
        <div className="mt-auto w-full flex">
          <button
            onClick={() => setPage(1)}
            className="flex-1 py-4 bg-amber-500 text-white hover:bg-amber-600 text-sm"
          >
            ← Back
          </button>
          <button
            onClick={() => setPage(3)}
            disabled={!endDate}
            className="flex-1 py-4 bg-blue-500 text-white hover:bg-blue-600 text-sm disabled:bg-gray-300"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Page 3: Filter */}
      <div className="flex-[0_0_100%] flex flex-col justify-between h-full">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mt-2">Filter by Email Status</h2>
          <p className="text-sm text-gray-500 mt-2 mb-4">Choose which emails to load</p>
          <div className="flex flex-col w-full ml-8 mb-6">
            {["read", "unread", "all"].map((option) => (
              <label key={option} className="flex items-center ">
                <input
                  type="radio"
                  name="filter"
                  value={option}
                  checked={filter === option}
                  onChange={() => setFilter(option as typeof filter)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700 capitalize">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-auto w-full">
          <button
            disabled={!filter}
            onClick={() => {
              setSubmitted(true);
              setPage(4);
            }}
            className="w-full py-4 bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300"
          >
            Load Emails →
          </button>
        </div>
      </div>

      {/* Page 4: Results & Actions */}
      <div className="flex-[0_0_100%] flex flex-col py-6 justify-between">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold text-gray-800  mb-4 ml-4">{filter.toUpperCase()} Emails from {startDate} to {endDate}</h2>
          {loading ? (
            <p className="text-gray-600">Loading email count...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <p className="text-lg text-gray-700 ">
              Total emails: <span className="font-bold">{emailCount ?? 0}</span>
            </p>
          )}
        </div>
        <div className="mt-auto  py-1 w-full flex">
          <button
            onClick={handleDeleteAll}
            disabled={emailCount === 0 || deleting}
            className={`flex-1 px-2 py-4 text-white text-sm font-medium rounded-bl-lg transition-colors ${
              emailCount === 0 || deleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {deleting ? "Deleting..." : "Delete All"}
          </button>
          <button
            onClick={handleBackClick}
            className="flex-1 px-2 py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-br-lg"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  </div>
);
}  