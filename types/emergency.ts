export type EmergencyType = 
  | 'Medical' 
  | 'Fire' 
  | 'Police' 
  | 'Accident' 
  | 'Natural Disaster';

export type EmergencyStatus = 
  | 'New' 
  | 'Pending' 
  | 'In Progress' 
  | 'Resolved';

export type EmergencySeverity = 
  | 'Low' 
  | 'Medium' 
  | 'High' 
  | 'Critical';

export interface Emergency {
  id: string;
  type: EmergencyType;
  status: EmergencyStatus;
  severity: EmergencySeverity;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  requester: {
    name: string;
    phone: string;
    medicalInfo?: string;
  };
  description: string;
  createdAt: string;
  updatedAt: string;
  additionalNotes?: string;
}
