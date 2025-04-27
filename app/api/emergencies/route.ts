import { NextResponse } from 'next/server';
import { emergencyData } from '@/data/emergency-data';
import { Emergency } from '@/types/emergency';
import SocketClient from '@/lib/socket';

// In-memory storage (replace with database in production)
let emergencies = [...emergencyData];

export async function GET() {
  return NextResponse.json(emergencies);
}

export async function POST(request: Request) {
  try {
    const newEmergency: Emergency = await request.json();
    
    // Validate the emergency data
    if (!newEmergency.id || !newEmergency.type || !newEmergency.location) {
      return NextResponse.json(
        { error: 'Missing required emergency fields' },
        { status: 400 }
      );
    }
    
    // Add timestamps if not provided
    if (!newEmergency.createdAt) {
      newEmergency.createdAt = new Date().toISOString();
    }
    newEmergency.updatedAt = new Date().toISOString();
    
    // Add to our in-memory store
    emergencies = [...emergencies, newEmergency];
    
    // Emit to socket server
    const socket = SocketClient.getInstance();
    socket.emit('newEmergency', newEmergency);
    
    return NextResponse.json(newEmergency, { status: 201 });
  } catch (error) {
    console.error('Error creating emergency:', error);
    return NextResponse.json(
      { error: 'Failed to create emergency' },
      { status: 500 }
    );
  }
}