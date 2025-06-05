// components/RangeFilter.tsx
import { Range } from "react-range";

const STEP = 10000;
const MIN = 0;
const MAX = 1000000;

type RangeFilterProps = {
    values: [number, number];
    setValues: (values: [number, number]) => void;
};

export default function RangeFilter({ values, setValues }: RangeFilterProps) {
  return (
    <div className="w-full max-w-md p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Size Range (bytes)
      </label>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(vals) => {
          if (vals.length === 2) {
            setValues([vals[0], vals[1]] as [number, number]);
          }
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-3 w-full bg-blue-200 rounded"
            style={{
              ...props.style,
              background: `linear-gradient(to right, 
                #e5e7eb ${((values[0] - MIN) / (MAX - MIN)) * 100}%, 
                #2563eb ${((values[0] - MIN) / (MAX - MIN)) * 100}%, 
                #2563eb ${((values[1] - MIN) / (MAX - MIN)) * 100}%, 
                #e5e7eb ${((values[1] - MIN) / (MAX - MIN)) * 100}%)`,
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="h-5 w-5 bg-blue-600 rounded-full cursor-pointer relative"
            style={{ ...props.style }}
          />
        )}
      />
      <div className="mt-2 text-sm text-gray-600">
        Selected range: {values[0].toLocaleString()} - {values[1].toLocaleString()} bytes
      </div>
    </div>
  );
}
