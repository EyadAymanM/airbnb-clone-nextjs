"use client";
import AddLisitngNav from "@/app/_components/AddListingLayout/AddLisitngNav";
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
library.add(fas);
function Page() {
  const categories = [
    {
      icon: "eye",
      displayName: "Amazing views",
      technicalName: "AMAZING_VIEWS",
    },
    { icon: "exclamation", displayName: "OMG!", technicalName: "OMG" },
    { icon: "tree", displayName: "Treehouses", technicalName: "TREEHOUSES" },
    { icon: "umbrella-beach", displayName: "Beach", technicalName: "BEACH" },
    { icon: "tractor", displayName: "Farms", technicalName: "FARMS" },
    { icon: "house", displayName: "Tiny homes", technicalName: "TINY_HOMES" },
    { icon: "water", displayName: "Lake", technicalName: "LAKE" },
    { icon: "box", displayName: "Containers", technicalName: "CONTAINERS" },
    { icon: "tent", displayName: "Camping", technicalName: "CAMPING" },
    { icon: "chess-rook", displayName: "Castle", technicalName: "CASTLE" },
    { icon: "person-skiing", displayName: "Skiing", technicalName: "SKIING" },
    { icon: "fire", displayName: "Campers", technicalName: "CAMPERS" },
    { icon: "snowflake", displayName: "Arctic", technicalName: "ARTIC" },
    { icon: "sailboat", displayName: "Boat", technicalName: "BOAT" },
    {
      icon: "mug-saucer",
      displayName: "Bed & breakfasts",
      technicalName: "BED_AND_BREAKFASTS",
    },
    { icon: "lightbulb", displayName: "Rooms", technicalName: "ROOMS" },
    {
      icon: "earth-europe",
      displayName: "Earth homes",
      technicalName: "EARTH_HOMES",
    },
    { icon: "tower-observation", displayName: "Tower", technicalName: "TOWER" },
    { icon: "hill-rockslide", displayName: "Caves", technicalName: "CAVES" },
    { icon: "champagne-glasses", displayName: "Luxes", technicalName: "LUXES" },
    {
      icon: "kitchen-set",
      displayName: "Chef's kitchen",
      technicalName: "CHEFS_KITCHEN",
    },
  ];
  const [selectedType, setSelectedType] = useState(null);
  return (
    <>
      <h1 className="max-w-2xl mx-auto my-2 text-3xl font-semibold font-airbnb text-center">Which of these best describes your place?</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-2xl mx-auto">
        {categories.map(({ icon, displayName, technicalName }) => (
          <div
            key={displayName}
            onClick={() => setSelectedType(technicalName)}
            className={`flex flex-col  justify-center p-4 border rounded-xl cursor-pointer transition-all overflow-hidden ${selectedType === technicalName
                ? "border-primary text-primary bg-[#f7f7f7]"
                : "border-gray-200 hover:border-gray-300"
              }`}
            role="button"
            tabIndex={0}
          >
            <div className="ms-4 h-10 mt-2">
              <FontAwesomeIcon
              fixedWidth={true}
                icon={["fas", icon]}
                className={`text-2xl mb-1 text-start ${selectedType ? "text-black" : "text-gray-500"}`}
              />
            </div>
            <span className="text-base font-semibold font-airbnb ms-2 text-[#333]">{displayName}</span>
          </div>
        ))}
      </div>
      <NextBackFooter progress={15} />
    </>
  );
}
export default Page;
