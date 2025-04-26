import { Emergency } from '@/types/emergency'; // Assuming Emergency type is defined correctly

export const emergencyData: Emergency[] = [
  {
    id: "e001",
    type: "Medical",
    status: "New",
    severity: "Critical",
    location: {
      address: "2100 Speedway, Austin, TX 78712",
      coordinates: { lat: 30.2849, lng: -97.7341 },
    },
    requester: {
      name: "John Smith",
      phone: "(512) 555-1234",
      medicalInfo: "History of heart problems, taking nitroglycerin.",
    },
    description: "Person experiencing severe chest pain and difficulty breathing.",
    createdAt: "2023-05-15T14:32:45Z",
    updatedAt: "2023-05-15T14:32:45Z",
  },
  {
    id: "e002",
    type: "Fire",
    status: "In Progress",
    severity: "High",
    location: {
      address: "1100 Congress Ave, Austin, TX 78701",
      coordinates: { lat: 30.2747, lng: -97.7404 },
    },
    requester: {
      name: "Sarah Johnson",
      phone: "(512) 555-5678",
    },
    description: "Small fire in kitchen, spreading to living room.",
    createdAt: "2023-05-15T14:15:22Z",
    updatedAt: "2023-05-15T14:15:22Z",
  },
  {
    id: "e003",
    type: "Police",
    status: "Pending",
    severity: "Medium",
    location: {
      address: "6th Street and Red River, Austin, TX 78701",
      coordinates: { lat: 30.2675, lng: -97.7365 },
    },
    requester: {
      name: "Michael Brown",
      phone: "(512) 555-9012",
    },
    description: "Suspicious activity near the bar entrance.",
    createdAt: "2023-05-15T14:05:11Z",
    updatedAt: "2023-05-15T14:05:11Z",
  },
  {
    id: "e004",
    type: "Accident",
    status: "New",
    severity: "High",
    location: {
      address: "I-35 and 51st Street, Austin, TX 78751",
      coordinates: { lat: 30.3023, lng: -97.7058 },
    },
    requester: {
      name: "Emily Davis",
      phone: "(512) 555-3456",
    },
    description: "Multi-car collision, possible injuries.",
    createdAt: "2023-05-15T13:58:33Z",
    updatedAt: "2023-05-15T13:58:33Z",
  },
  {
    id: "e005",
    type: "Natural Disaster",
    status: "In Progress",
    severity: "Critical",
    location: {
      address: "Shoal Creek Blvd, Austin, TX 78703",
      coordinates: { lat: 30.2954, lng: -97.7517 },
    },
    requester: {
      name: "Robert Wilson",
      phone: "(512) 555-7890",
    },
    description: "Flash flooding, water rising rapidly.",
    createdAt: "2023-05-15T13:45:19Z",
    updatedAt: "2023-05-15T13:45:19Z",
  },
  {
    id: "e006",
    type: "Medical",
    status: "New",
    severity: "Medium",
    location: {
      address: "2901 S Capital of Texas Hwy, Austin, TX 78746",
      coordinates: { lat: 30.2642, lng: -97.8002 },
    },
    requester: {
      name: "Jennifer Lee",
      phone: "(512) 555-2345",
      medicalInfo: "History of osteoporosis, taking blood thinners.",
    },
    description: "Elderly person fallen and unable to get up, possible hip injury.",
    createdAt: "2023-05-15T13:30:45Z",
    updatedAt: "2023-05-15T13:30:45Z",
  },
  {
    id: "e007",
    type: "Police",
    status: "Resolved",
    severity: "Low",
    location: {
      address: "11410 Century Oaks Terrace, Austin, TX 78758",
      coordinates: { lat: 30.4018, lng: -97.7252 },
    },
    requester: {
      name: "David Martinez",
      phone: "(512) 555-6789",
    },
    description: "Shoplifting incident at retail store.",
    createdAt: "2023-05-15T13:15:10Z",
    updatedAt: "2023-05-15T13:15:10Z",
  },
  {
    id: "e008",
    type: "Accident",
    status: "New",
    severity: "Medium",
    location: {
      address: "Lamar Blvd and Barton Springs Rd, Austin, TX 78704",
      coordinates: { lat: 30.2595, lng: -97.7602 },
    },
    requester: {
      name: "Lisa Thompson",
      phone: "(512) 555-0123",
    },
    description: "Bicycle and car collision, cyclist injured.",
    createdAt: "2023-05-15T13:00:27Z",
    updatedAt: "2023-05-15T13:00:27Z",
  },
];
