"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaEllipsisH,
  FaFacebookSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import { FaLink, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdOutlineIosShare } from "react-icons/md";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"; // Changed to react-share
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import img from "../../_assets/image.png";
import ButtonGroup from "../ButtonGroup";

const ShareModal = () => {
  const [showModal, setShowModal] = useState(false);
  const t = useTranslations('share');
  const toggleModal = () => setShowModal(!showModal);

  const shareUrl = `${window.location.origin}${window.location.pathname}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success(t('link-copied')); 
    } catch (err) {
      toast.error(t('copy-failed'));
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <ButtonGroup onClick={toggleModal} aria-label="Share">
          <span className="flex justify-center items-center gap-2">
            {t('share')} <MdOutlineIosShare />
          </span>
        </ButtonGroup>
      </DialogTrigger>
      <DialogContent className="bg-white border rounded-3xl p-6 sm:p-8 max-w-md sm:max-w-xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold mb-4 text-center">
            {t('invite-others-to-join')}
          </DialogTitle>
          <div className="flex items-center space-x-4">
            <Image
              src={img}
              alt="Shareable Image"
              width={80}
              height={80}
              className="rounded"
            />
            <div>
              <p className="text-sm sm:text-base text-gray-500 mx-2">
                {t('join-my-wishlist')}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
          <button
            className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition duration-200 flex items-center gap-3 font-semibold text-sm sm:text-base"
            onClick={copyToClipboard}
          >
            <FaLink className="text-2xl" /> {t('copy-link')}
          </button>

          <EmailShareButton url={shareUrl} subject={t('share-subject')}>
            <div className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition duration-200 flex items-center gap-3 font-semibold text-sm sm:text-base">
              <MdEmail className="text-2xl" /> {t('email')}
            </div>
          </EmailShareButton>

          <WhatsappShareButton url={shareUrl}>
            <div className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition duration-200 flex items-center gap-3 font-semibold text-sm sm:text-base">
              <FaWhatsappSquare className="text-2xl" /> {t('whatsapp')}
            </div>
          </WhatsappShareButton>

          <FacebookShareButton url={shareUrl}>
            <div className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition duration-200 flex items-center gap-3 font-semibold text-sm sm:text-base">
              <FaFacebookSquare className="text-2xl" /> {t('facebook')}
            </div>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl}>
            <div className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition duration-200 flex items-center gap-3 font-semibold text-sm sm:text-base">
              <FaXTwitter className="text-2xl" /> {t('twitter')}
            </div>
          </TwitterShareButton>

          <button
            className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition duration-200 flex items-center gap-3 font-semibold text-sm sm:text-base"
          >
            <FaEllipsisH className="text-2xl" /> {t('more-options')}
          </button>
        </div>

        <DialogDescription className="mt-6 text-gray-600 text-sm sm:text-base">
          {t('once-you-share-this-link')},{" "}
          <Link href="" className="text-blue-500 underline">
            {t('learn-more')}
          </Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;