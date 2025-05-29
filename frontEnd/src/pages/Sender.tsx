

export default function Sender() {
  return (
    <div className="flex flex-col h-full py-48 items-center justify-center">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Sender Page</h2>
        </div>
        
        <div className="flex items-center justify-center w-full">
            <div className="grid grid-cols-1 gap-6 w-full max-w-2xl">
                <div className="flex flex-col items-center justify-center p-6 bg-blue-100 rounded-xl shadow-md h-full">
                    <span className="text-lg font-medium text-gray-700">This is the sender page.</span>
                </div>
            </div>
        </div>
    </div>
  );
}