/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

type EmailResponse = {
  emailTotalCount: number;
  cacheKey: string;
}


export default function ByYear({
    year,
    onBack,
    isFlipped, // passed from YearPage to control visibility
    onFlip,    // passed from YearPage, called when filter is selected
  }: {
    year: string;
    onBack: () => void;
    isFlipped: boolean;
    onFlip: () => void;
  }) {
    const [filter, setFilter] = useState<string | null>(null);
    const [emailCount, setEmailCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cacheKey, setCacheKey] = useState<string | null>(null);
  
    const { user } = useAuth();
    const showBack = filter !== null;
  
    useEffect(() => {
      if (!filter) return;
  
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
        } catch {
          setError("Failed to fetch email count.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchEmailCount();
    }, [filter, year, user]);
  
    const handleFilterClick = (selectedFilter: string) => {
      setFilter(selectedFilter);
      onFlip();
    };
  
    const handleDeleteAll = async () => {
      if (!confirm("Are you sure you want to delete all these emails?")) return;
  
      setDeleting(true);
      setError(null);
      try {
        await axios.delete(`/email/${year}`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken ?? localStorage.getItem("accessToken")}`,
          },
          params: { cacheKey: cacheKey },
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
      setFilter(null);
      setEmailCount(null);
      setError(null);
      onBack();
    };
  
    return (
      <div className="relative bg-white rounded-lg shadow-lg h-[280px] overflow-hidden transition-transform duration-500 ease-in-out">
        <div
          className={`absolute inset-0 flex w-[200%] transition-transform duration-400 ease-in-out ${
            isFlipped ? "-translate-x-1/2" : "translate-x-0"
          }`}
        >
          {/* Column 1: Filters */}
          <div className="w-1/2 py-8 flex flex-col justify-between">
            <div className="text-center">
              <span className="text-5xl font-semibold text-gray-800">{year}</span>
              <p className="text-sm text-gray-500 mt-2 mb-6">View emails for this year</p>
                <div className="mt-auto py-24 flex">
                    <button
                        className="flex-1 px-2 py-3 bg-blue-500 text-white text-sm font-medium rounded-bl-lg hover:bg-blue-600"
                        onClick={() => handleFilterClick("read")}
                    >
                        Read
                    </button>
                    <button
                        className="flex-1 px-2 py-3 bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600"
                        onClick={() => handleFilterClick("unread")}
                    >
                        Unread
                    </button>
                    <button
                        className="flex-1 px-2 py-4 bg-green-500 text-white text-sm font-medium rounded-br-lg hover:bg-green-600"
                        onClick={() => handleFilterClick("all")}
                    >
                        All
                    </button>
                </div>
            </div>
          </div>
  
          {/* Column 2: Delete / Back */}
          <div className="w-1/2 py-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 ml-4">
                {filter?.toUpperCase()} Emails from {year} 
              </h2>
  
              {loading && <p className="text-gray-600 text-lg text-center mt-8">Loading email count...</p>}
              {error && <p className="text-red-600 text-center mt-8">{error}</p>}
  
              {!loading && !error && (
                <p className="text-lg text-gray-700 mt-8 text-center">
                  Total emails: <span className="font-bold">{emailCount ?? 0}</span>
                </p>
              )}
            </div>
  
            <div className="mt-auto py-20 flex">
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
  