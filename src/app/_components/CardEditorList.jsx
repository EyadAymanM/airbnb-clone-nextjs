"use client";
import { useState } from "react";
import CardEditor from "./CardEditor";
import CardLocationEdit from "./CardLocationEdit";
import { useLocale, useTranslations } from "next-intl";

const CardEditorList = ({ listing = {}, onCardClick, mobile }) => {
  const t = useTranslations('Listings');
  const locale = useLocale();
  const cardData = [
    { title: t("photo-tour"), description: t("photo-tour-description"), route: "photo-tour" },
    { title: t("title"), description: listing.title || t("no-title-available"), route: "title" },
    {
      title: t("description"),
      description:
        listing.description
          ? `${listing.description.slice(0, 25)}${listing.description.length > 25 ? '...' : ''}`
          : t("no-description-available"),
      route: "description",
    },
    { title: t("property-type"), description: listing.type || t("no-category"), route: "property-type" },
    { title: t("pricing"), description: listing.price ? `$${listing.price}` : t("no-price-available"), route: "pricing" },
    { title: t("number-of-guests"), description: listing.guests ? `${listing.guests} ${t("guests")}` : t("no-guests-info"), route: "number-of-guests" },
    { title: t("amenities"), description: listing.amenities?.map((amenity) => locale === "en"? amenity.name.en :amenity.name.ar).join(', ') || t("no-amenities"), route: "amenities" },
    {
      title: t("location"),
      description: listing.location
        ? `${listing.location.city || ''}, ${listing.location.street || ''}, ${listing.location.country || ''}`
          : t("no-location-available"),
      route: "location",
    },
  ];

  const [activeCard, setActiveCard] = useState(cardData[0].route);

  const toggleActive = (route) => {
    setActiveCard(route);
    mobile ? onCardClick(route) : null; 
  };

  return (
    <aside className="space-y-6 flex flex-col items-center justify-center p-4 md:px-8 lg:px-16 mb-10">
      {cardData.slice(0, -1).map((card, index) => (
        <CardEditor
          key={index}
          title={card.title}
          description={card.description}
          href={`/hosting/listings/${listing._id}/${card.route}`}
          activated={activeCard === card.route}
          onClick={() => toggleActive(card.route)}
          className="w-full max-w-xs sm:max-w-sm md:w-2/3 lg:w-1/2 hover:shadow-md transition-shadow duration-200"
        />
      ))}
      {/* The Location card */}
      <CardLocationEdit
        id={listing._id}
        activated={activeCard === "location"}
        onClick={() => toggleActive("location")}
        className="w-full max-w-xs sm:max-w-sm md:w-2/3 lg:w-1/2 hover:shadow-md transition-shadow duration-200"
        latitude={listing.location?.latitude}
        longitude={listing.location?.longitude}
        address={listing.address}
      />
    </aside>
  );
};

export default CardEditorList;