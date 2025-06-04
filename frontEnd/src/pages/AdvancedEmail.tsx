import ByAdvancedFilters from "../components/ByAdvancedFilters";

export default function AdvancedEmail() {
    return (
      <div className="flex flex-col py-22 items-center justify-center px-4">
            <div className="text-center mb-12 max-w-2xl">
              <h1 className="text-4xl font-bold text-gray-900">Search with Advanced Custom Filters</h1>
            </div>
            <ByAdvancedFilters /> 
          </div>
    );
  }