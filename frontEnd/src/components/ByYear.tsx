/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

export default function ByYear({
  year,
  startDate,
  endDate,
  onDeleteSuccess,
}: {
  year?: string;
  startDate?: string;
  endDate?: string;
  onDeleteSuccess?: () => void; // callback after deletion
}) {
  const [emailCount, setEmailCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmailCount = async () => {
      setLoading(true);
      setError(null);
      try {
        interface EmailCountResponse {
          count: number;
        }

        let response;
        if (year) {
          response = await axios.get<EmailCountResponse>(`/email/year/count`, { params: { year } });
        } else if (startDate && endDate) {
          response = await axios.get<EmailCountResponse>(`/email/date-range/count`, { params: { startDate, endDate } });
        }
        if (response) {
          setEmailCount(response.data.count);
        }
      } catch (err) {
        setError("Failed to fetch email count.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmailCount();
  }, [year, startDate, endDate]);

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete all these emails? This action cannot be undone.")) return;

    setDeleting(true);
    setError(null);
    try {
      if (year) {
        await axios.delete(`/email/year`, { params: { year } });
      } else if (startDate && endDate) {
        await axios.delete(`/email/date-range`, { params: { startDate, endDate } });
      }
      setEmailCount(0);
      onDeleteSuccess?.();
      alert("Emails deleted successfully.");
    } catch (err) {
      setError("Failed to delete emails.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-gray-600">Loading email count...</p>;

  if (error) return <p className="text-red-600">{error}</p>;

  if (emailCount === null) return null;

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {year
          ? `Emails from ${year}`
          : `Emails from ${startDate} to ${endDate}`}
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        Total emails: <span className="font-bold">{emailCount}</span>
      </p>
      <button
        onClick={handleDeleteAll}
        disabled={emailCount === 0 || deleting}
        className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
          emailCount === 0 || deleting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600"
        }`}
      >
        {deleting ? "Deleting..." : "Delete All"}
      </button>
    </div>
  );
}
