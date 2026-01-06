import { Role } from '@/models/User';
import { Server, Socket } from 'socket.io';

export const registerOrderEvents = (io: Server, socket: Socket) => {
  socket.on('join', ({ role, tableId }) => {
    if (role === Role.ADMIN) {
      socket.join('admin');

      io.to('admin').emit('join:result', {
        message: 'Admin join successfully'
      });
    }

    if (role === Role.USER && tableId) {
      socket.join(`table:${tableId}`);

      io.to(`table:${tableId}`).emit('join:result', {
        message: `User[table:${tableId}] join successfully`
      });
    }
  });

  // Backend: Send order to Admin
  // io.to('admin').emit('order:new', {
  //   orderId,
  //   tableId,
  //   items
  // });

  // Backend: Send order status to User
  // io.to(`table:${tableId}`).emit('order:update', {
  //   orderId,
  //   status: 'CONFIRMED'
  // });

  // Frontend: Admin
  // socket.on('order:new', (order) => {
  //   // hiển thị order mới
  // });

  // Frontend: User
  // socket.on('order:update', (data) => {
  //   // cập nhật trạng thái món
  // });
};
