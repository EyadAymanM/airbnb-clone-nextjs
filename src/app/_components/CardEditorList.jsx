"use client";

import { useState } from "react";
import CardEditor from "./CardEditor";
import CardLocationEdit from "./CardLocationEdit";



const CardEditorList = ({ listing }) => {
  const cardData = [
  { title: "Photo tour", description: "1 bedroom · 1 bed · 1 bath", route: "photo-tour" },
  { title: "Title", description: listing.title, route: "title" },
  { title: "Description",
    description: listing.description ? `${listing.description.slice(0, 15)}${listing.description.length > 50 ? '...' : ''}` : "No description available", 
    route: "description" 
  },
  { title: "Property type", description: listing.category, route: "property-type" },
  { title: "Pricing", description:`$ ${listing.price}`, route: "pricing" },
  { title: "Number of guests", description: `${listing.guests} guests`, route: "number-of-guests" },
  { title: "Amenities", description: listing.amenities?.map(amenity => amenity.name).join(', '), route: "amenities" },
  { title: "Location", description: `${listing.location?.city}, ${listing.location?.street}, ${listing.location?.country}`, route: "location" }, 
];
  const [activeCard, setActiveCard] = useState(cardData[0].route); 

  const toggleActive = (route) => {
    setActiveCard(route); 
  };

  return (
    <aside className="space-y-6 flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 mb-10">
      {cardData.slice(0, -1).map((card, index) => (
        <CardEditor
          key={index}
          title={card.title}
          description={card.description}
          href={`/hosting/listings/${listing._id}/${card.route}`}
          activated={activeCard === card.route} 
          onClick={() => toggleActive(card.route)} 
          className="w-full md:w-2/3 lg:w-1/2"
        />
      ))}
      {/* The Location card */}
      <CardLocationEdit
        id={listing._id}   
        activated={activeCard === "location"}
        onClick={() => toggleActive("location")} 
        className="w-full md:w-2/3 lg:w-1/2"
        latitude={listing.location?.latitude}
        longitude={listing.location?.longitude}
        address={listing.address}
      />
    </aside>
  );
};

export default CardEditorList;