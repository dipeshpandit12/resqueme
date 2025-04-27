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
  // Get count of active emergencies
  const activeCount = emergencies.length;

  // Map of emergency types to their badge colors
  const typeColorMap = {
    Medical: 'bg-red-100 text-red-700',
    Fire: 'bg-orange-100 text-orange-700',
    Police: 'bg-blue-100 text-blue-700', 
    Accident: 'bg-yellow-100 text-yellow-700',
    'Natural Disaster': 'bg-purple-100 text-purple-700',
  };

  // Map of severity levels to text colors
  const severityColorMap = {
    Critical: 'text-red-600 font-bold',
    High: 'text-orange-600 font-bold',
    Medium: 'text-yellow-600',
    Low: 'text-green-600',
  };

  // Helper function to format date in a more readable way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">Emergency Requests</h2>
        <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
          {activeCount} Active
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {emergencies.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No active emergency requests
          </div>
        ) : (
          <div className="divide-y">
            {emergencies.map((emergency) => {
              const typeColor = typeColorMap[emergency.type as keyof typeof typeColorMap] || 'bg-gray-100 text-gray-700';
              const severityColor = severityColorMap[emergency.severity as keyof typeof severityColorMap] || 'text-gray-600';
              
              return (
                <div
                  key={emergency.id}
                  onClick={() => onSelectEmergency(emergency)}
                  className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                    selectedEmergency?.id === emergency.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${emergency.severity === 'Critical' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                    <h3 className="font-medium text-gray-900">{emergency.requester.name}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColor}`}>
                      {emergency.type}
                    </span>
                  </div>
                  
                  <div className="ml-6">
                    <p className="text-sm text-gray-600">{emergency.location.address}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-400">{formatDate(emergency.createdAt)}</p>
                      <p className={`text-xs ${severityColor}`}>{emergency.severity} Severity</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}