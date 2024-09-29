'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';



export default function Listing() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        const data = await res.json();

        console.log(data.data);
        
        
        if (data.data) {
          setRooms(data.data);
        } else {
          console.error('No data found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <p>Loading rooms...</p>;
  }

  return (

<div>
  <h1 className="text-4xl font-bold text-rose-500 text-center">Rooms</h1>
 
 
  <div className="flex flex-wrap justify-center ">
    {rooms.map((room) => (
      <Link href={`/rooms/${room._id}`}
        key={room._id}
        className="w-full sm:w-1/3 lg:w-1/4 p-5" 
      >
        {room.images && room.images.length > 0 && (
          <Image
            src={room.images[0]}
            alt={room.address}
            width={100}
            height={100}
            priority
            className="w-full h-40 object-cover rounded-lg" 
          />
        )}
        <h2 className="text-lg font-bold">{room.address}</h2>
        <p>{room.summary}</p>
        <p className="font-semibold">Price: {room.price}</p>
      </Link>
    ))}
  </div>
</div>

  );
}