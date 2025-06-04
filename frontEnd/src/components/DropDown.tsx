type DropdownOption = {
    label: string;
    value: string;
}

type DropdownProps = {
    label?: string;
    value: string;
    options: DropdownOption[];
    onChange: (value: string) => void;
    className?: string;
    selectClassName?: string;
}

export default function Dropdown({
    label,
    value,
    options,
    onChange,
    className = "",
    selectClassName = "",
}: DropdownProps) {
    return (
        <div className={`flex items-center space-x-4 ${className}`}>
            {label && (
                <label className="text-m font-bold text-gray-700">{label}</label>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectClassName}`}
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
