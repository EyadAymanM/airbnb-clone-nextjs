"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../_components/Container";
import { fetchData, deleteData } from "@/app/_actions/booking/fetchtrips";
import { TripCard, NoTripsContent } from "@/app/_components/TripCard";

const categorizeTrips = (reservations) => {
  const now = new Date();
  const pastTrips = [];
  const futureTrips = [];

  reservations.forEach((reservation) => {
    if (new Date(reservation.endDate) < now) {
      pastTrips.push(reservation);
    } else {
      futureTrips.push(reservation);
    }
  });

  return { pastTrips, futureTrips };
};

export default function TripsPage() {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await fetchData("book");
        const { pastTrips, futureTrips } = categorizeTrips(data);
        setUpcomingTrips(futureTrips);
        setPastTrips(pastTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
        setUpcomingTrips([]);
        setPastTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleCancel = async (tripId) => {
    if (window.confirm("Are you sure you want to cancel thic trip ?")) {
      try {
        await deleteData(tripId);

        setUpcomingTrips((prevTrips) =>
          prevTrips.filter((trip) => trip._id !== tripId)
        );
      } catch (error) {
        console.error("Error cancelling trip:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12"> Loading trips...</div>;
  }

  return (
    <Container>
      <div className="min-h-screen">
        <h1 className="text-3xl font-bold mb-6 pb-3 border-b">Trips</h1>

        {upcomingTrips.length === 0 && pastTrips.length === 0 ? (
          <NoTripsContent />
        ) : (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past"> past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              {upcomingTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingTrips.map((trip) => (
                    <TripCard
                      key={trip._id}
                      trip={trip}
                      listingID={trip.listingId}
                      onCancel={handleCancel}
                    />
                  ))}
                </div>
              ) : (
                <NoTripsContent />
              )}
            </TabsContent>
            <TabsContent value="past">
              {pastTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastTrips.map((trip) => (
                    <TripCard
                      key={trip._id}
                      trip={trip}
                      listingID={trip.listingId}
                      onCancel={handleCancel}
                    />
                  ))}
                </div>
              ) : (
                <NoTripsContent />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Container>
  );
}
