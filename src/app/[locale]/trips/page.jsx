"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../_components/Container";
import { fetchData, deleteData, getUserTrips } from "@/app/_actions/booking/fetchtrips";
import { TripCard, NoTripsContent } from "@/app/_components/TripCard";
import NavBar from "@/app/_components/Navbar/NavBar";
import Loading from "@/app/_components/UnauthenticatedComponent.jsx/Loading";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import UnauthenticatedComponent from "@/app/_components/UnauthenticatedComponent.jsx/UnauthenticatedComponent";

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
  const { data: session, status } = useSession()
  const t = useTranslations("Trips")
  const locale = useLocale()
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status) {
      const fetchTrips = async () => {
        try {
          const data = await getUserTrips("book/user", session.user.token.access_token);
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
    }

  }, [status]);

  const handleCancel = async (tripId) => {
    if (window.confirm(t(""))) {
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
    return <Loading />;
  }

  if (status == "unauthenticated")
    return <UnauthenticatedComponent />

  return (
    <div>
      <NavBar />
      <Container>
        <div className="min-h-screen">
          <h1 className="text-3xl font-bold mb-6 pb-3">{t("trips")}</h1>
          {upcomingTrips.length === 0 && pastTrips.length === 0 ? (
            <NoTripsContent />
          ) : (
            <Tabs defaultValue="upcoming" className="w-full" dir={locale == "ar" ? "rtl" : ""}>
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">{t("upcoming")}</TabsTrigger>
                <TabsTrigger value="past"> {t("past")}</TabsTrigger>
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
    </div>

  );
}
