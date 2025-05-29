import React, { useState } from "react";
import ByYear from "../components/ByYear.tsx";

export default function YearPage() {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const [selectedYear, setSelectedYear] = useState<string | null>(currentYear.toString());
    const [customDateRange, setCustomDateRange] = useState<{ startDate: string; endDate: string } | null>(null);

    const handleYearClick = (year: string) => {
        setSelectedYear(year);
        setCustomDateRange(null); // Clear custom date range when a year is selected
        console.log(`Selected year: ${year}`);
    };

    const handleCustomDateRangeClick = () => {
        const startDate = prompt("Enter start date (YYYY-MM-DD):");
        const endDate = prompt("Enter end date (YYYY-MM-DD):");

        if (startDate && endDate) {
            setCustomDateRange({ startDate, endDate });
            setSelectedYear(null); // Clear selected year when a custom date range is selected
            console.log(`Selected custom date range: ${startDate} to ${endDate}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Year Selection</h1>
            <div className="grid grid-cols-2 gap-4">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => handleYearClick(year.toString())}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {year}
                    </button>
                ))}
                <button
                    onClick={handleCustomDateRangeClick}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Custom Date Range
                </button>
            </div>
            {selectedYear && <ByYear year={selectedYear} />}
            {customDateRange && (
                <ByYear startDate={customDateRange.startDate} endDate={customDateRange.endDate} />
            )}
        </div>
    );
}