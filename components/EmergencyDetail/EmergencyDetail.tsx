import { Emergency } from '@/types/emergency';

interface EmergencyDetailProps {
  emergency: Emergency | null;
  onSendHelp?: (emergency: Emergency) => void;
}

export default function EmergencyDetail({ emergency, onSendHelp }: EmergencyDetailProps) {
  if (!emergency) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-full flex items-center justify-center">
        <p className="text-gray-500">Select an emergency to view details</p>
      </div>
    );
  }

  const severityColor = {
    Critical: 'bg-red-100 text-red-700',
    High: 'bg-orange-100 text-orange-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700',
  }[emergency.severity];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col overflow-y-auto">
      <div className="space-y-4 flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{emergency.type}</h2>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${severityColor}`}>
            {emergency.severity}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500">Location</h3>
          <p className="text-gray-800">{emergency.location.address}</p>
          <p className="text-xs text-gray-400">
            {emergency.location.coordinates.lat}, {emergency.location.coordinates.lng}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500">Description</h3>
          <p className="text-gray-800">{emergency.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500">Requester Info</h3>
          <p className="text-gray-800">{emergency.requester.name}</p>
          <p className="text-gray-600 text-sm">{emergency.requester.phone}</p>
          {emergency.requester.medicalInfo && (
            <p className="text-gray-500 text-xs mt-1">{emergency.requester.medicalInfo}</p>
          )}
        </div>

        {emergency.additionalNotes && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Additional Notes</h3>
            <p className="text-gray-800">{emergency.additionalNotes}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => onSendHelp?.(emergency)}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors"
      >
        Send Help
      </button>
    </div>
  );
}
