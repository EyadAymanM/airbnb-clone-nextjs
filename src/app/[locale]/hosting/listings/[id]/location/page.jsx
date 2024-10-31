"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { fetchData } from "@/app/_actions/Listing/fetchData";

const LocationMarker = ({ setLocation }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setLocation({ latitude: lat, longitude: lng });
    },
  });
  return null;
};

const Location = ({ params: { id } }) => {
  const [location, setLocation] = useState({
    latitude: 26.555,
    longitude: 31.695,
  });
  const [initialAddress, setInitialAddress] = useState({
    country: "",
    city: "",
    governorate: "",
    street: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setLocation(data.location);
        setInitialAddress(data.address);
      } catch (error) {
        toast.error("Error fetching initial data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [id]);

  const updateLocation = async (values) => {
    try {
      const listing = await updateListing(id, { address: values, location });
      if (listing._id) {
        toast.success("Location updated successfully!");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Error updating location: " + error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-center font-airbnb">
        <div className="w-full">
          <h1 className="my-2 text-3xl font-semibold text-start">Location</h1>
          <div className="h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="animate-pulse h-[300px] w-full rounded-xl shadow border border-[#555] bg-gray-300"></div>
            ) : (
              <MapContainer
                center={[location.latitude, location.longitude]}
                zoom={6}
                className="h-[300px] rounded-xl shadow border border-[#555]"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution=""
                />
                <Marker position={[location.latitude, location.longitude]} />
                <LocationMarker setLocation={setLocation} />
              </MapContainer>
            )}

            <Formik initialValues={initialAddress} onSubmit={updateLocation} enableReinitialize>
              {({ isSubmitting }) => (
                <Form>
                  <div className="border-2 rounded-xl my-4 shadow p-4">
                    {Object.keys(initialAddress).map((field) => (
                      <div key={field} className="relative mb-4">
                        <Field
                          id={field}
                          name={field}
                          type="text"
                          className="w-full p-2 pt-6 bg-white border rounded-xl outline-none"
                        />
                        <label
                          htmlFor={field}
                          className="absolute text-sm text-neutral-600 -translate-y-3 top-5 left-4 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
                        >
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <ErrorMessage name={field} component="div" className="text-red-500 text-sm" />
                      </div>
                    ))}
                  </div>
                  <div className="m-4 flex justify-end">
                    <button
                      type="submit"
                      className="p-4 bg-black text-white rounded-xl hover:bg-gray-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update Location"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;