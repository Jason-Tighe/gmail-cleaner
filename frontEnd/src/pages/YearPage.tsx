import { useState } from "react";
import ByYear from "../components/ByYear";

export default function YearPage() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [flippedYear, setFlippedYear] = useState<string | null>(null);

  // Called when a ByYear card flips open
  const handleFlip = (year: string) => {
    setFlippedYear(year);
  };

  // Called when user clicks back button inside ByYear
  const handleBack = () => {
    setFlippedYear(null);
  };

  // Custom date range handler stays the same
  const handleCustomDateRangeClick = () => {
    const startDate = prompt("Enter start date (YYYY-MM-DD):");
    const endDate = prompt("Enter end date (YYYY-MM-DD):");

    if (startDate && endDate) {
      window.location.href = `/inbox/date-range?startDate=${startDate}&endDate=${endDate}`;
    }
  };

  return (
    <div className="flex flex-col py-22 items-center justify-center px-4">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">Choose a Year or Date Range</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
      {years.map((year) => {
        const isFlipped = flippedYear === year.toString();

        return (
            <ByYear
                key={year}
                year={year.toString()}
                isFlipped={isFlipped}
                onFlip={() => handleFlip(year.toString())}
                onBack={handleBack}
            />
        );
        })}

        {/* Custom range card */}
        <div className="flex flex-col justify-between bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl h-[280px]">
          <div className="flex flex-col items-center px-4 pt-8">
            <span className="text-5xl mb-4 font-semibold text-gray-800">Custom</span>
            <span className="text-sm text-gray-500 text-center">Define your own range</span>
          </div>
          <div className="w-full">
            <button
              className="w-full px-2 py-3 bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 rounded-b-lg"
              onClick={handleCustomDateRangeClick}
            >
              Select Range
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
