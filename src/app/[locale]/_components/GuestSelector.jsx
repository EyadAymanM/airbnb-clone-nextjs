
import {Link} from "@/i18n/routing";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";

const GuestSelector = () => {
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
  const [totalGuests, setTotalGuests] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTotalGuests(guests.adults + guests.children + guests.infants + guests.pets);
  }, [guests]);

  const updateGuests = (type, operation) => {
    setGuests(prevGuests => {
      const newValue = prevGuests[type] + (operation === 'increment' ? 1 : -1);
      return {
        ...prevGuests,
        [type]: Math.max(type === "adults" ? 1 : 0, newValue),
      };
    });
  };

  const resetGuests = () => {
    setGuests({ adults: 1, children: 0, infants: 0, pets: 0 });
  };

  const GuestTypeSelector = ({ title, subtitle, type }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex flex-col">
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-gray-500">{subtitle}</span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => updateGuests(type, "decrement")}
          className="bg-white text-gray-700 border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:border-gray-900 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200"
          disabled={guests[type] === (type === "adults" ? 1 : 0)}
        >
          -
        </button>
        <span className="w-8 text-center">{guests[type]}</span>
        <button
          onClick={() => updateGuests(type, "increment")}
          className="bg-white text-gray-700 border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:border-gray-900 transition duration-300"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="bg-white text-gray-700 border border-gray-200 rounded-full px-5 py-2 hover:border-gray-900 transition duration-300 flex items-center outline-0">
          {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-96 p-6 bg-white rounded-xl shadow-lg"
        align="start"
      >
        <div className="space-y-4 max-h-64 overflow-y-auto">
          <GuestTypeSelector
            title="Adults"
            subtitle="Ages 18 or above"
            type="adults"
          />
          <GuestTypeSelector
            title="Children"
            subtitle="Ages 2-17"
            type="children"
          />
          <GuestTypeSelector
            title="Infants"
            subtitle="Under 2"
            type="infants"
          />
          <GuestTypeSelector
            title="Pets"
            subtitle={
              <Link href="#" className="underline">
                Bringing a service animal?
              </Link>
            }
            type="pets"
          />
        </div>
        <div className=" "></div>
        <div className="flex justify-between items-center space-x-3 mt-6">
          <button
            onClick={resetGuests}
            className="px-4 py-2 rounded-2xl underline font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            disabled={totalGuests === 1}
          >
            Reset
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-800 transition-colors"
          >
            Save
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GuestSelector;
