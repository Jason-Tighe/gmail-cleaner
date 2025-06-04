import ByLabel from "../components/ByLabel";

export default function LabelPage() {
  return (
    <div className="flex flex-col py-22 items-center justify-center px-4">
        <div className="text-center mb-12 max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900">Filter by Labels</h1>
        </div>
        <ByLabel />
    </div>
  );
}