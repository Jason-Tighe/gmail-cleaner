// components/DatePicker.tsx
import React from "react";

export default function DatePicker({
  label,
  date,
  onChange,
}: {
  label: string;
  date: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col items-start w-full px-4 pt-6">
        <label className="text-3xl font-semibold text-gray-800 mb-4">{label}</label>
        <input
        type="date"
        className="border rounded px-3 py-2 w-full text-sm"
        value={date}
        onChange={(e) => onChange(e.target.value)}
        />
    </div>
  );
}
