/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Delete from "./Delete";

type EmailResponse = {
  emailTotalCount: number;
  cacheKey: string;
}

export default function ByYear({
  year,
  onBack,
  isFlipped,
  onFlip,
  shouldFetch,
}: {
  year: string;
  onBack: () => void;
  isFlipped: boolean;
  onFlip: () => void;
  shouldFetch?: boolean;
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const [emailCount, setEmailCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cacheKey, setCacheKey] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const { user } = useAuth();
  const showBack = filter !== null;

  useEffect(() => {
    if (!filter || !isFlipped || !shouldFetch || hasFetched) return;

    const fetchEmailCount = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<EmailResponse>(`/api/gmail/email/${year}`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken ?? localStorage.getItem("accessToken")}`,
          },
          params: {
            email: user?.email ?? localStorage.getItem("email"),
            filter,
          },
        });
        setCacheKey(response.data.cacheKey);
        setEmailCount(response.data.emailTotalCount);
        setHasFetched(true);
      } catch {
        setError("Failed to fetch email count.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmailCount();
  }, [filter, year, user, isFlipped, shouldFetch, hasFetched]);

  useEffect(() => {
    if (!isFlipped) setHasFetched(false);
  }, [isFlipped]);

  const handleFilterClick = (selectedFilter: string) => {
    setFilter(selectedFilter);
    onFlip();
  };

  const handleBackClick = () => {
    setFilter(null);
    setEmailCount(null);
    setError(null);
    onBack();
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md h-[280px] overflow-hidden transition-transform duration-500 ease-in-out">
      <div
        className={`absolute inset-0 flex w-[200%] transition-transform duration-400 ease-in-out ${
          isFlipped ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >
        {/* Front Face */}
        <div className="w-1/2 flex flex-col justify-between items-center px-6 py-8">
          <div className="text-center">
            <span className="text-5xl font-bold text-gray-800">{year}</span>
            <p className="text-sm text-gray-500 mt-2">View emails for this year</p>
          </div>
          <div className="w-full flex flex-col gap-1 ">
            <button
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
              onClick={() => handleFilterClick("read")}
            >
              Read
            </button>
            <button
              className="w-full py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600"
              onClick={() => handleFilterClick("unread")}
            >
              Unread
            </button>
            <button
              className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
              onClick={() => handleFilterClick("all")}
            >
              All
            </button>
          </div>
        </div>

        {/* Back Face */}
        <div className="w-1/2 flex flex-col justify-between px-6 py-6">
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              {filter?.toUpperCase()} 
              <p className="text-center">Emails from {year}</p>
            </h2>
            <div className="border-t border-gray-300 my-2"></div>

            {loading && <p className="text-gray-600 text-center">Loading email count...</p>}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {!loading && !error && (
              <p className="text-lg text-center text-gray-700">
                Total emails: <span className="font-bold">{emailCount ?? 0}</span>
              </p>
            )}
          </div>
          <div className="border-t border-gray-300 mt-1"></div>


          <div className="mt-8 flex gap-4">
            <button
                onClick={handleBackClick}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-semibold"
              >
              ← Back
            </button>
            <Delete
              cacheKey={cacheKey}
              onSuccess={() => {
                setEmailCount(0);
                handleBackClick();
              }}
              onError={(err) => setError(err)}
              disabled={emailCount === 0}
              label="icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
