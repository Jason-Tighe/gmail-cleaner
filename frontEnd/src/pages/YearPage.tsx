import { useState } from "react";
import ByYear from "../components/ByYear";
import ByDateRange from "../components/ByDateRange";

export default function YearPage() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [flippedYear, setFlippedYear] = useState<string | null>(null);

  const handleFlip = (year: string) => {
    setFlippedYear(year);
  };

  const handleBack = () => {
    setFlippedYear(null);
  };

  
  return (
    <div className="flex flex-col py-22 items-center justify-center px-4">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">Choose a Year or Date Range</h1>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
            <ByDateRange onBack={handleBack} />
        
            {years.slice(0, 5).map((year) => (
            <ByYear
                key={year}
                year={year.toString()}
                isFlipped={flippedYear === year.toString()}
                onFlip={() => handleFlip(year.toString())}
                onBack={handleBack}
                shouldFetch={flippedYear === year.toString()}
            />
            ))}
        </div>
    </div>
  );
}
