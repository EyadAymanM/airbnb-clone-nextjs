"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import { fetchData } from "@/app/_actions/Listing/fetchData";

const TitlePage = ({ params: { id } }) => {
  const [initialTitle, setInitialTitle] = useState("");
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setInitialTitle(data.title || ""); 
      } catch (error) {
        toast.error("Error fetching initial data.");
      }
    };

    fetchInitialData();
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("This field is required. Please enter a value.")
      .max(50, "Maximum 50 characters allowed"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const listing = await updateListing(id, { title: values.title });
      if (listing._id) {
        toast.success("Title updated successfully!");
      } else {
        toast.error("Something went wrong...");
      }
    } catch (error) {
      console.error("Error updating title:", error);
      toast.error("Failed to update the title.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center h-[80vh]">
      <Formik
        initialValues={{ title: initialTitle }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="space-y-5">
            {touched.title && errors.title && (
              <p className="text-sm text-red-600 text-center mt-2">
                {errors.title}
              </p>
            )}
            <p
              className={`text-sm mb-4 text-center ${
                values.title.length > 50 ? "text-red-600" : "text-gray-600"
              }`}
            >
              {values.title.length} / 50 characters
            </p>

            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <Field
                id="title"
                name="title"
                as="input"
                autoFocus
                className={`border-0 w-full py-6 text-4xl text-center font-semibold bg-white transition focus:outline-none ${
                  touched.title && errors.title ? "border-red-600" : ""
                }`}
                placeholder="Enter title..."
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

export default TitlePage;