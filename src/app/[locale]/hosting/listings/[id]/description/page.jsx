"use client";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import { Button } from "@/components/ui/button";
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import { useLocale, useTranslations } from "next-intl";

const DescriptionPage = ({ params: { id } }) => {
  const t = useTranslations("Listings");
  const locale = useLocale();
  const [initialDescription, setInitialDescription] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setInitialDescription(data.description || "");
      } catch (error) {
        toast.error(t("fetch_error"));
      }
    };
    fetchInitialData();
  }, [id, t]);

  const validationSchema = Yup.object({
    description: Yup.string()
      .required(t("this-field-is-required"))
      .max(500, t("maximum-500-characters-allowed")),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const listing = await updateListing(id, { description: values.description });
      if (listing._id) {
        toast.success(t("description-updated-successfully"));
      } else {
        toast.error(t("something-went-wrong"));
      }
    } catch (error) {
      toast.error(t("failed-to-update-description"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center h-[80vh] px-4">
      <h3 className={`text-2xl font-semibold mb-4 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
        {t("listing-description")}
      </h3>
      <Formik
        initialValues={{ description: initialDescription }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="space-y-5">
            {touched.description && errors.description && (
              <p className="text-sm text-red-600 text-center mt-2" aria-live="assertive">
                {errors.description}
              </p>
            )}
            <p
              className={`text-sm mb-4 text-center ${
                values.description.length > 500
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
              aria-live="polite"
            >
              {values.description.length} / 500 {t("characters-allowed")}
            </p>

            <div>
              <Field
                id="description"
                name="description"
                as="textarea"
                autoFocus
                className={`border-2 w-full py-4 sm:py-6 text-lg sm:text-xl text-center font-semibold bg-white transition focus:outline-0 rounded-xl  outline-0${
                  touched.description && errors.description
                    ? "border-red-600"
                    : "border-neutral-400"
                }`}
                placeholder={t("let-guests-know")}
                rows="5"
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

export default DescriptionPage;