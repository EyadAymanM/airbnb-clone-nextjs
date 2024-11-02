import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, Moon, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { format, differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ReviewComponent } from "./Review/ReviewComponent";



export function TripCard({ trip, listingID, onCancel }) {
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);

  const title = listingID?.title || "No title available";
  const photo = listingID?.photos?.[0] || "/placeholder.svg";
  const city = listingID?.address?.city || "Unknown city";

  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const nights = differenceInDays(endDate, startDate);

  const isUpcoming = startDate > new Date();
  const isPast = endDate < new Date();
  const isInProgress = !isUpcoming && !isPast;

  const formatDate = (date) => format(new Date(date), "MMM d, yyyy");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Card
        className="overflow-hidden shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <Image
            src={photo}
            alt={title}
            width={400}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          {isUpcoming && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white">
              Upcoming
            </Badge>
          )}
          {isInProgress && (
            <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
              In Progress
            </Badge>
          )}
          {isPast && (
            <Badge className="absolute top-2 right-2 bg-gray-500 text-white">
              Past
            </Badge>
          )}
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              {city}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            <div className="flex items-center">
              <Moon className="w-4 h-4 mr-2 text-primary" />
              {nights} {nights === 1 ? "night" : "nights"}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {isPast && (


            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="w-fit px-12 py-3 rounded-lg bg-[#E51D53] hover:bg-[#D11146] text-white"
                >
                  Add review
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] bg-white">
                <DialogHeader>
                  <DialogTitle className="text-center border-b pb-4">{locale == 'en' ? 'Submit a Review' : 'أضف مراجعة'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex justify-around">
                    <ReviewComponent title={title} city={city} trip={trip}/>
                  </div>
                </div>
              </DialogContent>
            </Dialog>)}
          {isUpcoming && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <motion.button
                  className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-2 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white p-6 rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure the trip has been cancelled?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently cancel
                    your trip to {city}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onCancel(trip._id)}>
                    confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function NoTripsContent() {
  const router = useRouter();
  return (
    <div className="text-start py-6 border-b">
      <h2 className="text-2xl font-semibold mb-2">No trips booked...yet!</h2>
      <p className="text-gray-600 mb-4">
        Time to dust off your bags and start planning your next adventure.
      </p>
      <Button
        variant="outline"
        className="text-xl text-center p-5  hover:bg-black hover:text-white rounded-xl "
        onClick={() => router.push("/")}
      >
        start searching{" "}
      </Button>
    </div>
  );
}
