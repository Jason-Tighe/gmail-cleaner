import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DatePicker from "./DatePicker";
import Delete from "./Delete";

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
        className="absolute inset-0 flex flex-nowrap transition-transform duration-500 ease-in-out w-full"
        style={{ transform: `translateX(-${page * 100}%)` }}
      >
        {/* Page 0 */}
        <div className="flex-[0_0_100%] w-full flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl mt-8 font-semibold ml-4 text-gray-800">Custom Date Range</h2>
          <div className="mt-auto w-full flex gap-2 px-4 pb-2">
            <button
              onClick={() => setPage(1)}
              className="w-full py-4 bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 rounded-lg"
            >
              Start
            </button>
          </div>
        </div>

        {/* Page 1 */}
        <div className="flex-[0_0_100%] w-full flex flex-col items-center justify-center h-full">
          <DatePicker label="Start Date" date={startDate} onChange={setStartDate} />
          <div className="mt-auto w-full flex gap-2 px-4 pb-2">
            <button
              onClick={() => setPage(0)}
              className="flex-1 py-4 bg-amber-500 text-white hover:bg-amber-600 text-sm rounded-lg"
            >
              ← Back
            </button>
            <button
              onClick={() => setPage(2)}
              disabled={!startDate}
              className="flex-1 py-4 bg-blue-500 text-white hover:bg-blue-600 text-sm disabled:bg-gray-300 rounded-lg"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Page 2 */}
        <div className="flex-[0_0_100%] w-full flex flex-col items-center justify-center h-full">
          <DatePicker label="End Date" date={endDate} onChange={setEndDate} />
          <div className="mt-auto w-full flex gap-2 px-4 pb-2">
            <button
              onClick={() => setPage(1)}
              className="flex-1 py-4 bg-amber-500 text-white hover:bg-amber-600 text-sm rounded-lg"
            >
              ← Back
            </button>
            <button
              onClick={() => setPage(3)}
              disabled={!endDate}
              className="flex-1 py-4 bg-blue-500 text-white hover:bg-blue-600 text-sm disabled:bg-gray-300 rounded-lg"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Page 3 */}
        <div className="flex-[0_0_100%] w-full flex flex-col justify-between h-full px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mt-2">Filter by Email Status</h2>
            <p className="text-sm text-gray-500 mt-2 mb-4">Choose which emails to load</p>
            <div className="flex flex-col w-full ml-8 mb-6">
              {["read", "unread", "all"].map((option) => (
                <label key={option} className="flex items-center">
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
          <div className="mt-auto w-full flex gap-2 px-4 pb-2">
            <button
              disabled={!filter}
              onClick={() => {
                setSubmitted(true);
                setPage(4);
              }}
              className="w-full py-4 bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 rounded-lg"
            >
              Load Emails →
            </button>
          </div>
        </div>

        {/* Page 4 */}
        <div className="flex-[0_0_100%] w-full flex flex-col py-6 justify-between px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 ml-4">
              {filter.toUpperCase()} Emails from {startDate} to {endDate}
            </h2>
            {loading ? (
              <p className="text-gray-600">Loading email count...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <p className="text-lg text-gray-700">
                Total emails: <span className="font-bold">{emailCount ?? 0}</span>
              </p>
            )}
          </div>
          <div className="mt-auto border-t border-gray-300 pt-4 flex gap-4">
            <button
              onClick={handleBackClick}
              className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-md"
            >
              ← Back
            </button>
            <Delete
              cacheKey={cacheKey}
              onSuccess={() => {
                setEmailCount(0);
                alert("Emails deleted successfully.");
                handleBackClick();
              }}
              onError={(err) => setError(err)}
              disabled={emailCount === 0 || loading}
              label="icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
