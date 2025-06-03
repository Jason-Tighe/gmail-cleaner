// components/DatePicker.tsx
import React from "react";

export default function DatePicker({
  label,
  date,
  disabled = false,
  onChange,
}: {
  label: string;
  date: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div
      className={`flex flex-col items-start w-full px-4 pt-6 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <label className="text-3xl font-semibold text-gray-800 mb-4">{label}</label>
      <input
        type="date"
        className="border rounded px-3 py-2 w-full text-sm"
        value={date}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
