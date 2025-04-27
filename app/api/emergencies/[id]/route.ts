import { NextResponse } from 'next/server';
import SocketClient from '@/lib/socket';
import { Emergency } from '@/types/emergency';

export async function GET() {
  try {
    // Get a reference to the socket
    const socket = SocketClient.getInstance();
    
    // Create a promise to wait for the data
    return new Promise<NextResponse>((resolve) => {
      // Request initial data from socket server
      socket.emit('requestInitialData');
      
      // Set up a one-time listener for the response
      socket.once('initialData', (data: Emergency[]) => {
        resolve(NextResponse.json(data));
      });
      
      // Timeout after 5 seconds
      setTimeout(() => {
        resolve(NextResponse.json([],
          { status: 408, statusText: 'Request Timeout' }
        ));
      }, 5000);
    });
  } catch (error) {
    console.error('Error fetching emergencies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emergencies' },
      { status: 500 }
    );
  }
}

// POST method remains the same
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