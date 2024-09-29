import { dbConnection } from '@/app/_lib/dbConnection';  
import { roomsModel } from '@/app/_lib/models/roomsSchema'; 

dbConnection();

export async function GET() {
  try {
    const rooms = await roomsModel.find(); 
    console.log(rooms);
    
    return new Response(JSON.stringify({ data: rooms }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}