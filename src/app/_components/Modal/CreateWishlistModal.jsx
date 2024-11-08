import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

import { createWishlists } from "@/app/_actions/wishlist/wishlist";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import InputField from "../InputField";
import IconButton from "../IconButton";
import { AiFillHeart } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

const CreateWishlistModal = ({ listingId, toggleIcon }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('model');
  const toggleModal = () => setShowModal(!showModal);
  const { data: session, status } = useSession()
  const initialValues = {
    wishlistName: "",
  };

  const validationSchema = Yup.object({
    wishlistName: Yup.string()
      .required(t('wishlist-name-required'))
      .max(50, t('wishlist-max-length')),
  });

  const onSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
        await createWishlists({
          title: values.wishlistName,
          listings: [listingId],
        }, session.user.token.access_token);
        setShowModal(false);
        resetForm();
    } catch (error) {
      console.error("Error creating wishlist:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Dialog open={showModal} onOpenChange={toggleModal}>
        <DialogTrigger asChild>
          {toggleIcon ? (
            <Button
              className="w-full py-6 bg-gray-800 text-white rounded-xl hover:bg-black text-lg transition-all duration-300"
              onClick={toggleModal}
            >
              {t('create-new-wishlist')}
            </Button>
          ) : (
            <IconButton
              ariaLabel={t('create-new-wishlist')}
              icon={AiFillHeart}
              onClick={toggleModal}
              classNames="absolute top-2 text-gray-300 right-3 flex items-center justify-center hover:scale-125"
            />
          )}
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-center font-airbnb">
              {t('create-wishlist')}
            </DialogTitle>
          </DialogHeader>
          <hr className="my-4 border-gray-400" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched }) => (
              <Form className="space-y-5">
                <InputField
                  id="wishlistName"
                  name="wishlistName"
                  type="text"
                  label={t('wishlist-name')}
                />
                {touched.wishlistName && errors.wishlistName ? (
                  <p className="text-sm text-red-600 mb-4">
                    {errors.wishlistName}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mb-4">
                    {values.wishlistName.length || 0} / 50 {t('characters')}
                  </p>
                )}
                <hr className="my-2 border-gray-400" />
                <div className="flex justify-between items-center">
                  <Button
                    variant="link"
                    className="px-8 py-6 rounded-2xl underline font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                    type="reset"
                  >
                    {t('clear')}
                  </Button>
                  <Button
                    className="bg-black text-white px-8 py-6 rounded-2xl hover:bg-gray-800 transition-colors"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('creating') : t('create')}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateWishlistModal;