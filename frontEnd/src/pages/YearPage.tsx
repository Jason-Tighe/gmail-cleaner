import React from "react";
import { useNavigate } from "react-router-dom";

export default function YearPage() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleYearClick = (year: string) => {
    // Navigate to the year detail page
    navigate(`/inbox/by-date/${year}`);
  };

  const handleCustomDateRangeClick = () => {
    const startDate = prompt("Enter start date (YYYY-MM-DD):");
    const endDate = prompt("Enter end date (YYYY-MM-DD):");

    if (startDate && endDate) {
      // Navigate to the date range detail page with query params
      navigate(`/inbox/date-range?startDate=${startDate}&endDate=${endDate}`);
    }
  };

  // Buttons for years + custom range
  const actionButtons = years.map((year) => ({
    title: year.toString(),
    description: "View emails for this year",
    colorClass: "bg-gray-100 hover:bg-gray-200",
    action: () => handleYearClick(year.toString()),
  }));

  actionButtons.push({
    title: "Custom Date Range",
    description: "Select specific dates",
    colorClass: "bg-gray-100 hover:bg-gray-200",
    action: handleCustomDateRangeClick,
  });

  return (
    <div className="flex flex-col py-24 items-center justify-center px-4">
    <div className="text-center mb-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900">Choose a Year or Date Range</h1>
    </div>

      <div className="flex items-center justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
          {actionButtons
            .filter((button) => button.title !== "Custom Date Range")
            .map((button, index) => (
              <button
                key={index}
                className={`flex flex-col items-center justify-center p-8 ${button.colorClass} rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl h-full`}
                onClick={button.action}
              >
                <span className="text-5xl mb-4 font-semibold text-gray-800">{button.title}</span>
                <span className="text-sm text-gray-500 mt-2">{button.description}</span>
              </button>
            ))}
          <button
            className="flex flex-col items-center justify-center p-8 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl h-full"
            onClick={() => navigate("/inbox/custom")}
          >
            <span className="text-5xl mb-4 font-semibold text-gray-800">Custom</span>
            <span className="text-sm text-gray-500 mt-2">Define your own range</span>
          </button>
        </div>
      </div>
    </div>
  );
}
