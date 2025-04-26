import { Emergency } from '@/types/emergency';

interface EmergencyListProps {
  emergencies: Emergency[];
  onSelectEmergency: (emergency: Emergency) => void;
  selectedEmergency?: Emergency | null;
}

export default function EmergencyList({
  emergencies,
  onSelectEmergency,
  selectedEmergency,
}: EmergencyListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[calc(100vh-500px)] flex flex-col">
      <h2 className="text-xl font-bold mb-4">Emergency Requests</h2>
      <div className="overflow-y-auto flex-1 space-y-2">
        {emergencies.map((emergency) => (
          <div
            key={emergency.id}
            onClick={() => onSelectEmergency(emergency)}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedEmergency?.id === emergency.id
                ? 'bg-blue-100 ring-2 ring-blue-500'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{emergency.type}</h3>
              <span className="text-xs text-gray-500">{new Date(emergency.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-gray-600 text-sm">{emergency.location.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
