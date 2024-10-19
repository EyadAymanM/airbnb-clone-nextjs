// 'use client'
// import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Link from 'next/link';
import InfoReviews from '../../_components/infoReviews'
import InfoHost from '@/app/_components/infoHost'
import InfoAmenities from '@/app/_components/infoAmenities'
import CalendarDemo from '@/app/_components/calender'
import BookingCard from '@/app/_components/bookingCard'
import { Button } from "@/components/ui/button"
import Description from '@/app/_components/description'

export default async function RoomDetail({params:{id}}) {

  // const [room, setRoom] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchRoom = async (id) => {
  //     try {
  //       const res = await fetch(`http://localhost:3000/listing/${id}`);

  //       if (!res.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await res.json();
  //       console.log(data);

  //       setRoom(data);
  //     } catch (error) {
  //       console.error('Error fetching room details:', error);
  //     }
  //     setLoading(false);
  //   };

  //   if (id) {
  //     fetchRoom(id);
  //   }
  // }, [id]);

  // if (loading) {
  //   return <p>Loading room details...</p>;
  // }

  // if (!room) {
  //   return <p>Room not found</p>;
  // }
  const res = await fetch(`http://localhost:3000/listing/${id}`);
  const room = await res.json()
  // console.log(room);
  
  return (
<>
<div className="container mt-8 ">

<h1 className='mb-3 sm:text-3xl md:text-4xl lg:text-5xl font-bold'>{room.home_type}</h1>


<Link href={`/rooms/${room._id}/all-images`} passHref>
  <ResizablePanelGroup
    direction="horizontal"
    className="max-w rounded-lg relative min-h-80"
  >

   
  <Button className="absolute bottom-2 right-2 bg-white text-black py-1 px-3 rounded-lg shadow-lg">
    Show All photos
  </Button>
    
    <ResizablePanel
      defaultSize={50}
      className="flex items-center justify-center sm:w-full"
    >
      <Image
        src={room.photos[0]} 
        alt="Main Image"
        width={100}
        height={100}
        priority
        className="object-cover w-full h-full"
      />
    </ResizablePanel>

    <ResizableHandle />

    <ResizablePanel defaultSize={50} className="hidden sm:block w-1/4">
      <ResizablePanelGroup direction="vertical">
       
        <ResizablePanel defaultSize={50}>
          <div className="grid grid-cols-2 gap-2 h-full ms-2">
            {room.photos.map((photo,index)=>(
              <Image
                key={index}
                src={photo}
                alt="Image 1"
                width={100}
                height={100}
                priority
                className="object-cover w-full h-full"
              />
            ))}
            {/* <Image
              src={room.images[2]}  
              alt="Image 2"
              width={100}
              height={100}
              priority
              className="object-cover w-full h-full"
            />
            <Image
              src={room.images[3]}  
              alt="Image 3"
              width={100}
              height={100}
              priority
              className="object-cover w-full h-full"
            />
            <Image
              src={room.images[4]}  
              alt="Image 4"
              width={100}
              height={100}
              priority
              className="object-cover w-full h-full"
            /> */}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</Link>


<div className="flex flex-col md:grid md:grid-cols-3 gap-3 mt-5 ">
  
  <div className="flex flex-col md:grid md:grid-cols-1 md:grid-auto-rows-auto md:gap-5 md:col-span-2">
    <div className="	 sm:text-xl md:text-2xl lg:text-4xl font-semibold">
              {room.type} in {room.address.city} {room.address.street}
    </div>
    <div><InfoReviews/></div>
    <div ><InfoHost/></div>
    <div><Description description={room.description}/></div>
    <div ><InfoAmenities/></div>
    <div><CalendarDemo/></div>
    {/* <div>div 6</div> */}
  </div>

  
  <div className="mt-5">
  <BookingCard/>
  </div>
</div>









</div>

</>
     
  );
}
