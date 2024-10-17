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
import { AiOutlineHeart } from "react-icons/ai";

const CreateWishlistModal = ({ listingId, toggleIcon }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const initialValues = {
    wishlistName: "",
  };

  const validationSchema = Yup.object({
    wishlistName: Yup.string()
      .required("Wishlist name is required")
      .max(50, "Maximum 50 characters allowed"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      await createWishlists({
        title: values.wishlistName,
        listings: [listingId],
      });
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error creating wishlist:", error);
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
              Create New Wishlist
            </Button>
          ) : (
            <IconButton
              ariaLabel="Add to Wishlist"
              icon={AiOutlineHeart}
              onClick={toggleModal}
              classNames="absolute top-4 right-4 flex items-center justify-center"
            />
          )}
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-3xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-center font-airbnb">
              Create wishlist
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
                  label="Name"
                />
                {touched.wishlistName && errors.wishlistName ? (
                  <p className="text-sm text-red-600 mb-4">
                    {errors.wishlistName}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mb-4">
                    {values.wishlistName.length || 0} / 50 characters
                  </p>
                )}
                <hr className="my-2 border-gray-400" />
                <div className="flex justify-between items-center">
                  <Button
                    variant="link"
                    className="px-8 py-6 rounded-2xl underline font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                    type="reset"
                  >
                    Clear
                  </Button>
                  <Button
                    className="bg-black text-white px-8 py-6 rounded-2xl hover:bg-gray-800 transition-colors"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create"}
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
