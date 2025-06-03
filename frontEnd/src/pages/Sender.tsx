import BySender from '../components/BySender';

export default function Sender() {
  return (
    <div className="flex flex-col h-full items-center justify-center">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Sender Page</h2>
        </div>
        <BySender />
        
    </div>
  );
}