'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import InfoReviews from '../../_components/infoReviews'
import HostInfo from '@/app/_components/HostInfo'
import InfoAmenities from '@/app/_components/infoAmenities'
import CalendarDemo from '@/app/_components/calender'
import BookingCard from '@/app/_components/bookingCard'
import { Button } from "@/components/ui/button"
import Description from '@/app/_components/description'
import ImageGallery from '@/app/_components/ImageGallery'
import Container from '@/app/_components/Container';
import RoomInfo from '@/app/_components/RoomInfo'



export default function RoomDetail({params:{id}}) {

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setRoom(data.data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
      setLoading(false);
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  if (loading) {
    return <p>Loading room details...</p>;
  }

  if (!room) {
    return <p>Room not found</p>;
  }

  return (
<>
<Container>
<div className=" mt-8 ">

<h1 className='mb-3 sm:text-3xl md:text-4xl lg:text-5xl font-bold'>{room.home_type}</h1>

<Link href={`/rooms/${room._id}/all-images`} passHref>
<ImageGallery images={room.images}/>
</Link>



<div className="flex flex-col md:grid md:grid-cols-3 gap-3 mt-5 ">
  
  <div className="flex flex-col md:grid md:grid-cols-1 md:grid-auto-rows-auto md:gap-5 md:col-span-2">


    <RoomInfo title={room.room_type} address={room.address} guestCount={4} bedroomCount={2} bedCount={6} bathroomCount={2}/>
    <InfoReviews/>
    <HostInfo name={"abeer hafez"}/>
    <Description/>
    <InfoAmenities/>
    <CalendarDemo/>
  </div>

  
  <div className="mt-5">
  <BookingCard price={50}/>
  </div>
</div>









</div>
</Container>

</>
     
  );
}
