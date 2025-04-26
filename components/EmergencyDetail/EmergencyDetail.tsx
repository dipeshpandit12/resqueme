import { Emergency } from '@/types';

interface EmergencyDetailProps {
  emergency: Emergency | null;
  onSendHelp?: (emergency: Emergency) => void;
}

export default function EmergencyDetail({ emergency, onSendHelp }: EmergencyDetailProps) {
  if (!emergency) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 h-full">
        <p className="text-center text-gray-500">Select an emergency to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">
        {emergency.type.charAt(0).toUpperCase() + emergency.type.slice(1)} Emergency
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">Location</h3>
          <p>{emergency.location}</p>
          <p className="text-sm text-gray-500">
            Coordinates: {emergency.coordinates.lat}, {emergency.coordinates.lng}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Description</h3>
          <p>{emergency.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Reporter Information</h3>
          <p>Name: {emergency.reporter.name}</p>
          <p>Contact: {emergency.reporter.contact}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Status</h3>
          <span className={`inline-block px-2 py-1 rounded ${
            emergency.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            emergency.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            {emergency.status}
          </span>
        </div>

        <button
          onClick={() => onSendHelp?.(emergency)}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors mt-8"
        >
          Send Help Now
        </button>
      </div>
    </div>
  );
}