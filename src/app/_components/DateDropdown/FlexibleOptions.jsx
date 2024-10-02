import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState, useRef, useEffect } from "react";

library.add(fas);
const FlexibleOptions = () => {
  const [stayOption, setStayOption] = useState("Weekend");

  return (
    <div className="py-4 space-y-4">
      <p className="text-lg font-semibold text-center">
        Stay for a {stayOption}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {["Weekend", "Week", "Month"].map((option) => (
          <Button
            key={option}
            variant="outline"
            className={`rounded-full text-sm font-normal py-1 px-4 border-gray-300 hover:border-gray-900 ${
              stayOption === option ? "border-gray-900 bg-gray-100" : ""
            }`}
            onClick={() => setStayOption(option)}
          >
            {option}
          </Button>
        ))}
      </div>
      <MonthButtons />
    </div>
  );
};

const MonthButtons = () => {
  const [activeMonths, setActiveMonths] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthClick = (month) => {
    setActiveMonths((prevActiveMonths) =>
      prevActiveMonths.includes(month)
        ? prevActiveMonths.filter((m) => m !== month)
        : [...prevActiveMonths, month]
    );
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
      <p className="text-lg font-semibold text-center">
        {activeMonths.length > 0
          ? `Go in ${activeMonths.join(", ")}`
          : "Go anytime"}
      </p>
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto flex gap-4 py-4 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {months.map((month) => (
          <div
            key={month}
            className={`min-w-32 py-6 px-4 border border-gray-300 rounded-xl hover:border-gray-900 transition duration-300 ease-in-out transform hover:scale-105 ${
              activeMonths.includes(month) ? "border-black bg-gray-200" : ""
            }`}
            onClick={() => handleMonthClick(month)}
          >
            <div className="flex flex-col items-center justify-center">
              {activeMonths.includes(month) ? (
                <FontAwesomeIcon
                  icon={["fas", "calendar-check"]}
                  className="text-black text-xl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={["fas", "calendar-days"]}
                  className="text-gray-500 text-xl"
                />
              )}
              <div className="text-base font-medium mt-1">{month}</div>
              <div className="text-xs font-light">
                {new Date().getFullYear()}
              </div>
            </div>
          </div>
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

export default FlexibleOptions;
