"use client";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import { Button } from "@/components/ui/button";
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DescriptionPage = ({ params: { id } }) => {
  const [initialDescription, setInitialDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setInitialDescription(data.description || "");
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Error fetching initial data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  const validationSchema = Yup.object({
    description: Yup.string()
      .required("This field is required. Please enter a value.")
      .max(500, "Maximum 500 characters allowed"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const listing = await updateListing(id, { description: values.description });
      if (listing._id) {
        toast.success("Description updated successfully!");
      } else {
        toast.error("Something went wrong...");
      }
    } catch (error) {
      console.error("Error updating description:", error);
      toast.error("Failed to update the description. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center h-[80vh]">
      <h3 className="text-2xl font-semibold mb-4">Listing description</h3>
      {loading ? (
        <Skeleton height={200} className="mb-4" /> 
      ) : (
        <Formik
          initialValues={{ description: initialDescription }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="space-y-5">
              {touched.description && errors.description && (
                <p className="text-sm text-red-600 text-center mt-2">
                  {errors.description}
                </p>
              )}
              <p
                className={`text-sm mb-4 text-center ${
                  values.description.length > 500
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {values.description.length} / 500 characters
              </p>

              <div>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  autoFocus
                  className={`border-0 w-full py-6 text-lg text-center font-semibold bg-white transition focus:outline-none ${
                    touched.description && errors.description
                      ? "border-red-600"
                      : ""
                  }`}
                  placeholder="Let guests know why they'll love staying at your place."
                  rows="5"
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
      )}
    </div>
  );
};

export default DescriptionPage;