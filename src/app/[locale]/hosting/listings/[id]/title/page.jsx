"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import { useTranslations } from "next-intl";

const TitlePage = ({ params: { id } }) => {
  const t = useTranslations('Listings');
  const [initialTitle, setInitialTitle] = useState("");
  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setInitialTitle(data.title || ""); 
      } catch (error) {
        toast.error(t("fetch_error"));
      }
    };

    fetchInitialData();
  }, [id, t]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required(t("this-field-is-required"))
      .max(50, t("maximum-50-characters-allowed")),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const listing = await updateListing(id, { title: values.title });
      if (listing._id) {
        toast.success(t("title-updated-successfully"));
      } else {
        toast.error(t("failed-to-update-title"));
      }
    } catch (error) {
      toast.error(t("failed-to-update-title"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center h-[80vh] px-4">
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
              {values.title.length} / 50 {t("characters-allowed")}
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
                className={`border-0 w-full py-4 sm:py-6 text-xl sm:text-4xl text-center font-semibold bg-white transition focus:outline-none ${
                  touched.title && errors.title ? "border-red-600" : ""
                }`}
                placeholder={t("enter-title")}
              />
            </div>

            <hr className="my-2 border-gray-400" />

            <div className="flex justify-center sm:justify-end items-center">
              <Button
                className="bg-black text-white w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 rounded-xl hover:bg-gray-800 transition-colors"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("saving") : t("save")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TitlePage;