import { io, Socket } from 'socket.io-client';

class SocketClient {
  static instance: Socket | null = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = io('http://localhost:3001', {
        path: '/api/socket',
        transports: ['websocket']
      });
    }
    return this.instance;
  }

  static disconnect() {
    if (this.instance) {
      this.instance.disconnect();
      this.instance = null;
    }
  }
}

export default SocketClient;