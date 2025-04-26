export interface Emergency {
  id: number;
  type: 'medical' | 'fire' | 'police';
  status: 'pending' | 'in-progress' | 'resolved';
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  timestamp: string;
  reporter: {
    name: string;
    contact: string;
  };
}