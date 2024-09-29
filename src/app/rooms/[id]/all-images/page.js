"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { Button} from '@/components/ui/button'

const AllImages = ({ params: { id } }) => {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setRoom(data.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  return (
  <>
  
  <Link href={`/listing/${id}`} >
        <Button className=" py-2 px-4 text-5xl">
          ←
        </Button>
      </Link>

    <div className="container">
    
      <h1 className=" text-3xl font-semibold mb-4">photo tour</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {room?.images?.map((image, index) => (
            <Image
              key={index}
              src={image} 
              alt={`Image ${index + 1}`}
              width={100}
              height={100}
              className="object-cover w-full h-64 rounded-lg"
            />
          ))}
        </div>
      
    </div>

    </>
  );
};

export default AllImages;