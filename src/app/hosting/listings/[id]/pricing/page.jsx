"use client";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import { Button } from "@/components/ui/button";
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { updateListing } from "@/app/_actions/Listing/updateListing";

const PricingPage = ({ params: { id } }) => {
  const [initialPrice, setInitialPrice] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setInitialPrice(data.price || "");  
      } catch (error) {
        toast.error("Error fetching initial data.");
      }
    };

    fetchInitialData();
  }, [id]);

  const validationSchema = Yup.object({
    price: Yup.number()
      .required("This field is required. Please enter a value.")
      .positive("Price must be a positive number"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const updatedListing = await updateListing(id, { price: values.price });
      if (updatedListing._id) {
        toast.success("Price updated successfully!");
      } else {
        toast.error("Failed to update the price.");
      }
    } catch (error) {
      console.error("Error updating pricing:", error);
      toast.error("Error updating pricing.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center h-[80vh]">
      <Formik
        initialValues={{ price: initialPrice }}  
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize  
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="space-y-5">
            {touched.price && errors.price && (
              <p className="text-sm text-red-600 text-center mt-2">
                {errors.price}
              </p>
            )}
            <div>
              <label htmlFor="price" className="sr-only">Price</label>
              <Field
                id="price"
                name="price"
                as="input"
                type="number"
                autoFocus
                className={`border-0 w-full py-6 text-4xl text-center font-semibold bg-white transition focus:outline-none ${
                  touched.price && errors.price ? 'border-red-600' : ''
                }`}
                placeholder="Enter price..."
              />
            </div>
            <hr className="my-2 border-gray-400" />
            <div className="flex justify-end items-center">
              <Button
                className="bg-black text-white px-8 py-6 rounded-2xl hover:bg-gray-800 transition-colors"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PricingPage;