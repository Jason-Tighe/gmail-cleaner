type DropdownOption = {
    label: string;
    value: string;
  };
  
  type DropdownProps = {
    label?: string;
    value: string | string[];
    options: DropdownOption[];
    onChange: (value: string | string[]) => void;
    className?: string;
    selectClassName?: string;
    inputType?: "single" | "multiple";
  };
  
  export default function Dropdown({
    label,
    value,
    options,
    onChange,
    className = "",
    selectClassName = "",
    inputType = "single",
  }: DropdownProps) {
    const isMultiple = inputType === "multiple";
  
    // Helper to toggle a checkbox value in the array
    const toggleValue = (val: string) => {
      if (!Array.isArray(value)) return;
      if (value.includes(val)) {
        onChange(value.filter((v) => v !== val));
      } else {
        onChange([...value, val]);
      }
    };
  
    if (isMultiple) {
      // Render checkboxes instead of multi-select
      return (
        <div className={className}>
          {label && (
            <label className="block mb-1 text-m font-bold text-gray-700">
              {label}
            </label>
          )}
          <div className="max-h-28 overflow-y-auto border border-gray-300 rounded p-2 bg-white shadow-sm">
            {options.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center space-x-2 mb-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(opt.value)}
                  onChange={() => toggleValue(opt.value)}
                  className="form-checkbox text-blue-600"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
  
    // Single select dropdown for "single"
    return (
      <div className={className}>
        {label && (
          <label className="text-m font-bold text-gray-700">{label}</label>
        )}
        <select
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className={`
            bg-white text-gray-800 border border-gray-300 rounded px-2 py-1 text-sm shadow-sm
            appearance-none
            ${selectClassName}
          `}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  