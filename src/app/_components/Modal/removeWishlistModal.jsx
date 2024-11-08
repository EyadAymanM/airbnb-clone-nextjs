"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

import { Button } from "@/components/ui/button";
import { removeWishlist } from "@/app/_actions/wishlist/wishlist";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { useSession } from "next-auth/react";

const RemoveWishlistModal = ({ id, title }) => {
  const t = useTranslations('Wishlist');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();

  const toggleModal = () => setShowModal(!showModal);

  const onSubmit = async () => {
    setIsSubmitting(true);
    await removeWishlist(id, session.user.token.access_token);
    setShowModal(false);
  };

  return (
    <div>
      <Dialog open={showModal} onOpenChange={toggleModal}>
        <DialogTrigger asChild>
          <button className="absolute top-5 left-5 bg-gray-100 rounded-full p-1 shadow-md z-10 group-hover:block hidden">
            <IoClose className="w-6 h-6 text-gray-600" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl text-center font-airbnb mt-10">
              {t('delete-wishlist')}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center text-gray-700 mb-10">
            {`" ${title} " ${t('will-be-permanently-deleted')}.`}
          </div>
          <hr className="my-2 border-gray-400" />

          <div className="flex justify-between items-center">
            <Button
              variant="link"
              className="px-8 py-6 rounded-2xl underline font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-300"
              type="reset"
              onClick={toggleModal}
            >
              {t('cancel')}
            </Button>
            <Button
              className="bg-black text-white px-8 py-6 rounded-2xl hover:bg-gray-800 transition-colors"
              type="submit"
              disabled={isSubmitting}
              onClick={onSubmit}
            >
              {isSubmitting ? t('deleting') : t('delete')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RemoveWishlistModal;
