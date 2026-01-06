import { Server, Socket } from 'socket.io';
import { registerOrderEvents } from './order.socket';

export const registerSocketEvents = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Socket client connected:', socket.id);

    // Register event
    registerOrderEvents(io, socket);

    socket.on('disconnect', () => {
      console.log('Socket client disconnected:', socket.id);
    });
  });
};
