// components/DatePicker.tsx
import React from "react";

export default function DatePicker({
  label,
  date,
  disabled = false,
  textSize = "text-3xl", 
  labelPosition = "top",
  onChange,
}: {
  label: string;
  date: string;
  disabled?: boolean;
  textSize?: string; 
  labelPosition?: "top" | "inline"; 
  onChange: (value: string) => void;
}) {
  return (
    <div
      className={`flex ${
        labelPosition === "inline" ? "items-center" : "flex-col items-start"
      } w-full px-4 pt-6 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <label
        className={`${textSize} font-semibold text-gray-800 ${
          labelPosition === "inline" ? "mr-4" : "mb-4"
        }`}
      >
        {label}
      </label>
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
