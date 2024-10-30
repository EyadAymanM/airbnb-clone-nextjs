import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../../components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { FaEllipsisH, FaFacebookSquare, FaWhatsappSquare } from "react-icons/fa";
import { FaFacebookMessenger, FaLink, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdOutlineIosShare } from "react-icons/md";
import img from "../../_assets/image.png";
import ButtonGroup from "../ButtonGroup";

const ShareModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <Dialog open={showModal} onOpenChange={toggleModal} >
      <DialogTrigger asChild>
        <ButtonGroup onClick={toggleModal} ariaLabel="Share">
          <span className="flex justify-center items-center gap-2">
            Share <MdOutlineIosShare />
          </span>
        </ButtonGroup>
      </DialogTrigger>
      <DialogContent className="bg-white border rounded-3xl p-8 max-w-xl w-full">
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-bold mb-4">
            Invite others to join
          </DialogTitle>
          <div className="flex items-center">
            <Image
              src={img}
              alt=''
              width={80}
              height={80}
              className="rounded mr-4"
            />
            <div>
              <p className="text-gray-500">Join my wishlist: Icons 2024.</p>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-start gap-3 font-semibold">
            <FaLink className="text-2xl" /> Copy Link
          </button>
          <button className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-start gap-3 font-semibold">
            <MdEmail className="text-2xl" /> Email
          </button>
          <button className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-start gap-3 font-semibold">
            <BiMessageDetail className="text-2xl" /> Messages
          </button>
          <button className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-start gap-3 font-semibold">
            <FaWhatsappSquare className="text-2xl" /> WhatsApp
          </button>
          <button className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-start gap-3 font-semibold">
            <FaFacebookMessenger className="text-2xl" /> Messenger
          </button>
          <button className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-start gap-3 font-semibold">
            <FaFacebookSquare className="text-2xl" /> Facebook
          </button>
          <button className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-start gap-3 font-semibold">
            <FaXTwitter className="text-2xl" /> Twitter
          </button>
          <button className="py-2 px-4 border rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-start gap-3 font-semibold">
            <FaEllipsisH className="text-2xl" /> More options
          </button>
        </div>
        <DialogDescription className="mt-6 text-gray-600">
          Once you share this link, anyone can view your wishlist.
          <Link href="" className="text-blue-500 underline">
            Learn more
          </Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
