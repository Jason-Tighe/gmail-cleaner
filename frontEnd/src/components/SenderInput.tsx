type SenderInputProps = {
  value: string;
  label?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export default function SenderInput({
  value,
  label = "Sender Email",
  onChange,
  disabled = false,
}: SenderInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor="sender" className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type="email"
        id="sender"
        name="sender"
        placeholder="Enter sender's email"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md "
      />
    </div>
  );
}
