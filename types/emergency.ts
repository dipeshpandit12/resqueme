export type EmergencyType = 'MEDICAL' | 'FIRE' | 'POLICE' | 'NATURAL_DISASTER';
export type EmergencyStatus = 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'RESOLVED';
export type EmergencySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

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
}