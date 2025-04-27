import { NextRequest, NextResponse } from 'next/server';
import SocketClient from '@/lib/socket';

// This route serves as a bridge between your Next.js API and the socket server
export async function GET() {
  return NextResponse.json({ status: 'Socket API is running' });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const socket = SocketClient.getInstance();
    
    // Forward the event to the socket server
    if (data.event && data.payload) {
      socket.emit(data.event, data.payload);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process socket request' },
      { status: 500 }
    );
    console.log(error);
  }
}