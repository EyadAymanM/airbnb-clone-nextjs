"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import parse from "html-react-parser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import { Button } from "@/components/ui/button";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import { useLocale, useTranslations } from "next-intl";

const AmenitiesModal = ({ listingId, selectedAmenities }) => {
  const t = useTranslations("Listings");
  const [showModal, setShowModal] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(selectedAmenities);
  const locale = useLocale();
  useEffect(() => {
    setSelected(selectedAmenities);
  }, [selectedAmenities]);

  const toggleModal = () => setShowModal((prev) => !prev);

  const toggleAmenity = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (showModal) {
      const fetchAmenities = async () => {
        setLoading(true);
        try {
          const data = await fetchData("amenity");
          setAmenities(data);
        } catch (error) {
          toast.error(t("error-fetching-amenities") + " " + error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAmenities();
    }
  }, [showModal]);

  const handleSave = async () => {
    try {
      const listing = await updateListing(listingId, { amenities: selected });
      if (listing._id) {
        toast.success(t("amenities-updated-successfully"));
        toggleModal();
      } else {
        toast.error(t("something-went-wrong"));
      }
    } catch (error) {
      toast.error(t("failed-to-update-the-amenities"));
    }
  };

  return (
    <div>
      <Dialog open={showModal} onOpenChange={toggleModal} aria-labelledby="amenities-dialog" aria-describedby="Select amenities for your listing">
        <DialogTrigger asChild>
          <div>
            <FaPlus className="text-4xl bg-gray-100 rounded-full p-2 hover:bg-gray-300 cursor-pointer" />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-3xl max-w-xl p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle id="amenities-dialog" className="text-xl text-center font-airbnb">
              {t("amenities")}
            </DialogTitle>
          </DialogHeader>
          <hr className="my-4 border-gray-300" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl h-80 overflow-y-auto ">
            {loading ? (
              <LoadingSkeleton count={9} />
            ) : (
              amenities.map(({ name, icon, _id }) => (
                <AmenityCard
                  key={_id}
                  name={locale === "en"? name.en: name.ar}
                  icon={icon}
                  id={_id}
                  selected={selected.includes(_id)}
                  toggleAmenity={toggleAmenity}
                />
              ))
            )}
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="flex justify-end items-center">
            <Button
              className="bg-black text-white px-8 py-6 rounded-2xl hover:bg-gray-800 transition-colors"
              type="submit"
              onClick={handleSave}
            >
              {t("save")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AmenityCard = ({ name, icon, id, selected, toggleAmenity }) => (
  <div
    onClick={() => toggleAmenity(id)}
    className={`flex justify-center items-center p-5 border rounded-xl cursor-pointer transition-all  ${
      selected ? "border-primary text-primary bg-[#f7f7f7]" : "border-gray-200 hover:border-gray-300"
    }`}
    role="checkbox"
    aria-checked={selected}
    aria-label={`Toggle ${name}`}
  >
    <AmenityIcon svgString={icon} className="w-6 h-6" />
    <span className="text-base font-semibold font-airbnb ms-2 text-[#333]">
      {name}
    </span>
  </div>
);

const LoadingSkeleton = ({ count }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse flex flex-col justify-center items-center p-2 border rounded-xl w-44 h-10 bg-gray-200"
      />
    ))}
  </>
);

function AmenityIcon({ svgString, className }) {
  const SVG = svgString.replace(/className="([^"]*)"/, `className="${className}"`);
  return <>{parse(SVG)}</>;
}

export default AmenitiesModal;