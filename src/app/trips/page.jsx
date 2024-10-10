'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, EditIcon, XIcon } from 'lucide-react'
import { format, isValid, parseISO } from 'date-fns'
import { ar } from 'date-fns/locale'
import Container from '../_components/Container'

const formatDate = (dateString) => {
  const date = parseISO(dateString)
  if (!isValid(date)) {
    return 'تاريخ غير صالح'
  }
  return format(date, "d MMMM yyyy", { locale: ar })
}

const TripCard = ({ trip, onEdit, onCancel }) => {
  const router = useRouter()

  return (
    <Card className="overflow-hidden">
      <Image
        src={trip.image || "/placeholder.svg"}
        alt={trip.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle>{trip.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 ml-1" />
            {trip.location}
          </div>
          <div className="flex items-center mt-1">
            <CalendarIcon className="w-4 h-4 ml-1" />
            {formatDate(trip.checkIn)} - {formatDate(trip.checkOut)}
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button onClick={() => router.push(`/trips/${trip._id}`)}>
          عرض التفاصيل
        </Button>
        {trip.status === "upcoming" && (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onEdit(trip._id)}>
              <EditIcon className="w-4 h-4 ml-2" />
              تعديل
            </Button>
            <Button variant="destructive" onClick={() => onCancel(trip._id)}>
              <XIcon className="w-4 h-4 ml-2" />
              إلغاء
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

const NoTripsContent = () => {
  const router = useRouter()
  return (
    <div className="text-start py-6 border-b">
      <h2 className="text-2xl font-semibold mb-2">No trips booked...yet!</h2>
      <p className="text-gray-600 mb-4">
      Time to dust off your bags and start planning your next adventure.
      </p>
      <Button variant='outline' className='text-xl text-center p-5  hover:bg-black hover:text-white rounded-xl ' onClick={() => router.push('/')}>start searching </Button>
    </div>
  )
}

export default function TripsPage() {
  const router = useRouter()
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrips = async () => {
      // Simulating API call
      setTrips([
                  // {
                  //   _id: "1",
                  //   title: "Mountain Retreat",
                  //   location: "Aspen, Colorado",
                  //   checkIn: "2023-08-12",
                  //   checkOut: "2023-08-17",
                  //   image: "/placeholder.svg?height=200&width=300&text=Mountain+Retreat",
                  //   status: "upcoming",
                  // },
                  // {
                  //   _id: "2",
                  //   title: "Beach Paradise",
                  //   location: "Cancun, Mexico",
                  //   checkIn: "2023-09-05",
                  //   checkOut: "2023-09-10",
                  //   image: "/placeholder.svg?height=200&width=300&text=Beach+Paradise",
                  //   status: "upcoming",
                  // },
                  // {
                  //   _id: "3",
                  //   title: "City Exploration",
                  //   location: "Paris, France",
                  //   checkIn: "2023-10-15",
                  //   checkOut: "2023-10-20",
                  //   image: "/placeholder.svg?height=200&width=300&text=City+Exploration",
                  //   status: "upcoming",
                  // },
                  // {
                  //   _id: "4",
                  //   title: "Cozy Cabin Getaway",
                  //   location: "Lake Tahoe, California",
                  //   checkIn: "2022-12-23",
                  //   checkOut: "2022-12-28",
                  //   image: "/placeholder.svg?height=200&width=300&text=Cozy+Cabin+Getaway",
                  //   status: "past",
                  // },
                ])
      setLoading(false)
    }

    fetchTrips()
  }, [])

  // useEffect(() => {
  //   const fetchTrips = async () => {
  //       try {
  //         const response = await fetch('http://localhost:3000/book?userId=66ff63e57cdd212245b7a9e1')
  //           if (!response.ok) {
  //               throw new Error('Network response was not ok');
  //           }
  //           const data = await response.json();
  //           console.log(data);
            
  //           setTrips(data); // استخدم البيانات المستلمة
  //       console.log(trips);
        
        
  //         } catch (error) {
  //           console.error('Error fetching trips:', error);
  //           setTrips([]); // في حالة الخطأ، قم بإزالة الرحلات
  //       } finally {
  //           setLoading(false);
  //       }
  //   };fetchTrips();
  // }, []);

  const handleEdit = (tripId) => {
    router.push(`/trips/${tripId}/edit`)
  }

  const handleCancel = async (tripId) => {
    if (window.confirm('هل أنت متأكد أنك تريد إلغاء هذه الرحلة؟')) {
      try {
        // Simulating API call
        setTrips(prevTrips => prevTrips.filter(trip => trip._id !== tripId))
      } catch (error) {
        console.error('Error cancelling trip:', error)
      }
    }
  }

  const upcomingTrips = trips.filter(trip => trip.status === "upcoming")
  const pastTrips = trips.filter(trip => trip.status === "past")

  if (loading) {
    return <div className="text-center py-12">جاري التحميل...</div>
  }


    //    
    return (
      <Container>
      <div className="min-h-screen">
        <h1 className="text-3xl font-bold mb-6 pb-3 border-b">Trips</h1>

        {trips.length === 0 ? (
          <NoTripsContent type="upcoming" />
        ) : (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">الرحلات القادمة</TabsTrigger>
              <TabsTrigger value="past">الرحلات السابقة</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              {upcomingTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingTrips.map(trip => (
                    <TripCard 
                      key={trip._id} 
                      trip={trip} 
                      onEdit={handleEdit} 
                      onCancel={handleCancel} 
                    />
                  ))}
                </div>
              ) : (
                <NoTripsContent type="upcoming" />
              )}
            </TabsContent>
            <TabsContent value="past">
              {pastTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastTrips.map(trip => (
                    <TripCard 
                      key={trip._id} 
                      trip={trip} 
                      onEdit={handleEdit} 
                      onCancel={handleCancel} 
                    />
                  ))}
                </div>
              ) : (
                <NoTripsContent type="past" />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Container>
      // <div>
      //   {loading ? (
      //     <p>Loading...</p>
      //   ) : (
      //     <ul>
      //       {trips.map((trip) => (
      //         <li key={trip._id}>
      //           <p>Listing ID: {trip.listingId}</p>
      //           <p>Start Date: {new Date(trip.startDate).toLocaleDateString()}</p>
      //           <p>End Date: {new Date(trip.endDate).toLocaleDateString()}</p>
      //           <p>Total Price: {trip.totalPrice} EGP</p>
      //         </li>
      //       ))}
      //     </ul>
      //   )}
      // </div>
    );
    

  
}



// pages/book-trip.js
// import { useState } from 'react';

// const BookTrip = () => {
//     const [checkIn, setCheckIn] = useState('');
//     const [checkOut, setCheckOut] = useState('');
//     const [propertyId, setPropertyId] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch('/api/bookings', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ checkIn, checkOut, propertyId }),
//         });
//         const data = await response.json();
//         console.log(data); // عالج البيانات حسب الحاجة
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" placeholder="Property ID" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
//             <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
//             <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
//             <button type="submit">احجز</button>
//         </form>
//     );
// };

// export default BookTrip;



// pages/my-trips.js
// import React, { useEffect, useState } from 'react';

// const MyTrips = () => {
//     const [pastTrips, setPastTrips] = useState([]);
//     const [futureTrips, setFutureTrips] = useState([]);

//     useEffect(() => {
//         const fetchTrips = async () => {
//             const response = await fetch('/api/bookings');
//             const data = await response.json();
//             setPastTrips(data.pastTrips);
//             setFutureTrips(data.futureTrips);
//         };

//         fetchTrips();
//     }, []);

//     return (
//         <div>
//             <h1>رحلاتي</h1>
//             <h2>رحلات في الماضي</h2>
//             {pastTrips.length === 0 ? (
//                 <p>لا توجد رحلات محفوظة في الماضي.</p>
//             ) : (
//                 <ul>
//                     {pastTrips.map((trip) => (
//                         <li key={trip.id}>
//                             <h3>{trip.propertyId}</h3>
//                             <p>تاريخ الوصول: {new Date(trip.checkIn).toLocaleDateString()}</p>
//                             <p>تاريخ المغادرة: {new Date(trip.checkOut).toLocaleDateString()}</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             <h2>رحلات في المستقبل</h2>
//             {futureTrips.length === 0 ? (
//                 <p>لا توجد رحلات محفوظة في المستقبل.</p>
//             ) : (
//                 <ul>
//                     {futureTrips.map((trip) => (
//                         <li key={trip.id}>
//                             <h3>{trip.propertyId}</h3>
//                             <p>تاريخ الوصول: {new Date(trip.checkIn).toLocaleDateString()}</p>
//                             <p>تاريخ المغادرة: {new Date(trip.checkOut).toLocaleDateString()}</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default MyTrips;
