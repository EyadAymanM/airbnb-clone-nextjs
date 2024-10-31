import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import IconButton from "../IconButton";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineIosShare } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const SettingsModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div>
      <Dialog open={showModal} onOpenChange={toggleModal}>
        <DialogTrigger asChild>
          <IconButton
            ariaLabel="More Options"
            icon={BsThreeDots}
            click={toggleModal}
          />
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Settings</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <button className="w-full py-2  border-b rounded-lg  flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MdOutlineIosShare className="mr-2" />
                Share wishlist
              </span>
              <IoIosArrowForward />
            </button>
            <button className="w-full py-2  border-b rounded-lg  flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FaEye className="mr-2" />
                Send as view-only link
              </span>
              <IoIosArrowForward />
            </button>
            <button className="w-full py-2  border-b rounded-lg flex items-center justify-between ">
              <span className="flex items-center gap-2">
                <MdDriveFileRenameOutline className="mr-2" />
                Rename
              </span>
              <IoIosArrowForward />
            </button>
            <button className="w-full py-2  border-b rounded-lg flex items-center justify-between text-red-500">
              <span className="flex items-center gap-2">
                <MdDelete className="mr-2" />
                Delete
              </span>
              <IoIosArrowForward />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsModal;
