import { roomsModel } from '@/app/-lip/models/roomsSchema';


export async function GET(req) {
  const { pathname } = new URL(req.url);
  const roomId = pathname.split('/').pop();

  try {
    if (!roomId) {
      return new Response(JSON.stringify({ message: 'Room ID is required' }), { status: 400 });
    }

    const room = await roomsModel.findById(roomId);
    console.log('Populated Room:', room);

    if (!room) {
      return new Response(JSON.stringify({ message: 'Room not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ data: room }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}