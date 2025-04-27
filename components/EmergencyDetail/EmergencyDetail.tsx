import { Emergency } from '@/types/emergency';
import { MapPinIcon, PhoneIcon, ClockIcon } from 'lucide-react';

interface EmergencyDetailProps {
  emergency: Emergency | null;
  onSendHelp?: (emergency: Emergency) => void;
}

export default function EmergencyDetail({ emergency, onSendHelp }: EmergencyDetailProps) {
  if (!emergency) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-full flex items-center justify-center flex-col">
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Emergency Details</h2>
          <p className="text-gray-500">Select an emergency to view details</p>
        </div>
      </div>
    );
  }

  const typeColorMap = {
    Medical: 'bg-red-100 text-red-700',
    Fire: 'bg-orange-100 text-orange-700',
    Police: 'bg-blue-100 text-blue-700',
    Accident: 'bg-yellow-100 text-yellow-700',
    'Natural Disaster': 'bg-purple-100 text-purple-700',
  };

  const severityColorMap = {
    Critical: 'bg-red-100 text-red-700',
    High: 'bg-orange-100 text-orange-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700',
  };

  const typeColor = typeColorMap[emergency.type as keyof typeof typeColorMap] || 'bg-gray-100 text-gray-700';
  const severityColor = severityColorMap[emergency.severity as keyof typeof severityColorMap] || 'bg-gray-100 text-gray-700';

  // Format date for display
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
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">Emergency Details</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">New</span>
      </div>

      <div className="p-4 flex gap-2 flex-wrap border-b">
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${typeColor}`}>
          {emergency.type}
        </span>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${severityColor}`}>
          {emergency.severity} Severity
        </span>
      </div>

      <div className="overflow-y-auto flex-1">
        {/* Requester Information */}
        <div className="p-5 border-b">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 mr-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <h3 className="text-base font-semibold">Requester Information</h3>
          </div>
          <div className="ml-8 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Name:</p>
              <p className="font-medium">{emergency.requester.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone:</p>
              <div className="flex items-center">
                <p className="font-medium">{emergency.requester.phone}</p>
                <button className="ml-2 text-blue-600">
                  <PhoneIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Information */}
        <div className="p-5 border-b">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 mr-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <h3 className="text-base font-semibold">Emergency Information</h3>
          </div>
          <div className="ml-8 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Location:</p>
              <div className="flex items-center">
                <p className="font-medium">{emergency.location.address}</p>
                <button className="ml-2 text-blue-600">
                  <MapPinIcon size={16} />
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time:</p>
              <div className="flex items-center">
                <p className="font-medium">{formatDate(emergency.createdAt)}</p>
                <ClockIcon className="ml-2 text-gray-400" size={16} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description:</p>
              <p>{emergency.description}</p>
            </div>
            {emergency.requester.medicalInfo && (
              <div>
                <p className="text-sm text-gray-500">Medical Info:</p>
                <p>{emergency.requester.medicalInfo}</p>
              </div>
            )}
          </div>
        </div>

        {/* Coordinates */}
        <div className="p-5 border-b">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 mr-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <h3 className="text-base font-semibold">Coordinates</h3>
          </div>
          <div className="ml-8 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Latitude:</p>
              <p className="font-medium">{emergency.location.coordinates.lat}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Longitude:</p>
              <p className="font-medium">{emergency.location.coordinates.lng}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t flex gap-3">
        <button 
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Contact Requester
        </button>
        <button 
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          onClick={() => onSendHelp?.(emergency)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Get Directions
        </button>
      </div>
    </div>
  );
}