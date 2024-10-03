"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

library.add(fas);

const categories = [
  { icon: "eye", displayName: "All", technicalName: "ALL" },
  { icon: "eye", displayName: "Amazing views", technicalName: "AMAZING_VIEWS" },
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

const Category = ({ icon, displayName, activated, onClick }) => (
  <div
    className={`cursor-pointer border-b-2 flex flex-col items-center p-2 transition-all duration-300 ${
      activated
        ? "category-activated border-black"
        : "border-transparent hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    <FontAwesomeIcon
      icon={["fas", icon]}
      className={`text-2xl mb-1 ${activated ? "text-black" : "text-gray-500"}`}
    />
    <span
      className={`text-center text-[0.8rem] whitespace-nowrap tracking-[0.25px] ${
        activated ? "font-semibold" : ""
      }`}
      title={displayName}
    >
      {displayName}
    </span>
  </div>
);

const CategoryList = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const handleCategoryClick = (technicalName) => {
    setActiveCategory(technicalName);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: direction * container.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="relative mx-10">
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto flex gap-7 py-2 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((category) => (
          <Category
            key={category.technicalName}
            icon={category.icon}
            displayName={category.displayName}
            activated={activeCategory === category.technicalName}
            onClick={() => handleCategoryClick(category.technicalName)}
          />
        ))}
      </div>
      {showLeftArrow && (
        <button
          className="absolute -left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white p-2 border rounded-full shadow-md transition-opacity duration-300"
          onClick={() => scroll(-1)}
        >
          <FontAwesomeIcon icon={["fas", "chevron-left"]} />
        </button>
      )}
      {showRightArrow && (
        <button
          className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white p-2 border rounded-full shadow-md transition-opacity duration-300"
          onClick={() => scroll(1)}
        >
          <FontAwesomeIcon icon={["fas", "chevron-right"]} />
        </button>
      )}
    </div>
  );
};

export default CategoryList;
