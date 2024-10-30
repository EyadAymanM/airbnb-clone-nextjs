'use client';
import { fetchData } from '@/app/[locale]/_actions/Listing/fetchData';
import { updateListing } from '@/app/[locale]/_actions/Listing/updateListing';
import { Button } from '@/components/ui/button';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function PropertyType({ params: { id } }) {
  const [category, setCategory] = useState([]);
  const [listingType, setListingType] = useState('');
  const [listingCategory, setListingCategory] = useState('');
  const [bathrooms, setBathrooms] = useState(0);
  const [bedrooms, setBedrooms] = useState(0); 

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData('category');
        setCategory(data);
        const listing = await fetchData(`listing/${id}`);
        setListingType(listing.type);
        setListingCategory(listing.category);
        setBathrooms(listing.bathrooms);
        setBedrooms(listing.bedrooms);
      } catch (error) {
        toast.error("Error fetching initial data: " + error.message);
      }
    };
    fetchInitialData();
  }, [id]);

  const handleSave = async (values) => {
    try {
      const listing = await updateListing(id, values);
      if (listing._id) {  
        toast.success("Property saved successfully!");
      } else {
        toast.error("Something went wrong...");
      }
    } catch (error) {
      toast.error("Error saving property: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Property Type</h2>

      <Formik
        initialValues={{
          type: listingType,
          category: listingCategory,
          bathrooms: bathrooms,
          bedrooms: bedrooms,
        }}
        onSubmit={handleSave}
        enableReinitialize 
      >
        {() => (
          <Form className="space-y-6"> 
            <PropertyTypeSelect />
            <CategorySelect category={category} />
            <CounterSelect name="bathrooms" label="How many bathrooms?" />
            <CounterSelect name="bedrooms" label="How many bedrooms?" />
            <div className="mt-6">
              <div className="flex justify-end items-center">
                <Button
                  className="bg-black text-white px-8 py-6 rounded-2xl hover:bg-gray-800 transition-colors"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export const PropertyTypeSelect = () => (
  <div className="mb-4 w-full relative">
    <Field
      as="select"
      id="type"
      name="type"
      className="w-full pt-6 bg-white border-2 rounded-xl transition border-neutral-400 focus:border-neutral-800 focus:outline-none"
    >
      <option value="apartment">Apartment</option>
      <option value="house">House</option>
      <option value="room">Room</option>
      <option value="hostel">Hostel</option>
      <option value="villa">Villa</option>
    </Field>
    <label
      htmlFor="type"
      className="absolute font-extralight text-md duration-150 transform -translate-y-3 top-4 z-10 origin-[0] left-4"
    >
      Which is most like your place?
    </label>
  </div>
);

export const CategorySelect = ({ category }) => (
  <div className="mb-4 w-full relative">
    <Field
      as="select"
      id="category"
      name="category"
      className="w-full pt-6 bg-white border-2 rounded-xl transition border-neutral-400 focus:border-neutral-800 focus:outline-none"
    >
      {category.map(({ _id, displayName, technicalName }) => (
        <option key={_id} value={technicalName}>{displayName}</option>
      ))}
    </Field>
    <label
      htmlFor="category"
      className="absolute font-extralight text-md duration-150 transform -translate-y-3 top-4 z-10 origin-[0] left-4"
    >
      Which category fits your property?
    </label>
  </div>
);


export const CounterSelect = ({ name, label }) => {
  const { values, setFieldValue } = useFormikContext();

  const increment = () => {
    setFieldValue(name, values[name] + 1);
  };

  const decrement = () => {
    setFieldValue(name, values[name] - 1);
  };

  return (
    <div className="mb-4 w-full relative">
      <div className="flex justify-end items-center space-x-4">
        <button
          onClick={decrement}
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          className="text-2xl font-bold px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none disabled:opacity-10"
          disabled={values[name] === 0}
        >
          -
        </button>
        <span className="text-2xl font-bold">
          {values[name]}
        </span>
        <button
          onClick={increment}
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          className="text-2xl font-bold px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          +
        </button>
      </div>
      <label
        htmlFor={name}
        className="absolute font-extralight text-md duration-150 transform -translate-y-3 top-4 z-10 origin-[0] left-4"
      >
        {label}
      </label>
    </div>
  );
};