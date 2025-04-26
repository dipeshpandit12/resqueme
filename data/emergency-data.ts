import { Emergency } from '@/types/emergency';

export const mockEmergencies: Emergency[] = [
    {
        id: '1',
        type: 'MEDICAL',
        status: 'PENDING',
        severity: 'HIGH',
        location: {
            address: '123 Congress Ave, Austin, TX',
            coordinates: {
                lat: 30.2672,
                lng: -97.7431
            }
        },
        requester: {
            name: 'John Doe',
            phone: '(512) 555-0123',
            medicalInfo: 'Allergic to penicillin'
        },
        description: 'Severe chest pain, difficulty breathing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Add more mock emergencies as needed
];