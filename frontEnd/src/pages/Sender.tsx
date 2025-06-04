import BySender from '../components/BySender';

export default function Sender() {
  return (
    <div className="flex flex-col py-22 items-center justify-center px-4">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">Sender Page</h1>
      </div>
      <BySender /> 
    </div>
  );
}