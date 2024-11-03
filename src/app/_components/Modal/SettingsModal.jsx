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
import { useLocale, useTranslations } from "next-intl";
const SettingsModal = () => {
  const [showModal, setShowModal] = useState(false);
  const t = useTranslations('share');
  const locale = useLocale();
  const toggleModal = () => setShowModal(!showModal);

  return (
    <div>
      <Dialog open={showModal} onOpenChange={toggleModal}>
        <DialogTrigger asChild>
          <IconButton
            ariaLabel={t('settings')}
            icon={BsThreeDots}
            click={toggleModal}
          />
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">{t('settings')}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <button className="w-full py-2  border-b rounded-lg  flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MdOutlineIosShare className="mr-2" />
                {t('share-wishlist')}
              </span>
              <IoIosArrowForward className={`mr-2 ${locale === 'ar' ? 'rotate-180' : ''}`}/>
            </button>
            <button className="w-full py-2  border-b rounded-lg  flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FaEye className="mr-2" />
                {t('send-as-view-only-link')}
              </span>
              <IoIosArrowForward className={`mr-2 ${locale === 'ar' ? 'rotate-180' : ''}`}/>
            </button>
            <button className="w-full py-2  border-b rounded-lg flex items-center justify-between ">
              <span className="flex items-center gap-2">
                <MdDriveFileRenameOutline className="mr-2" />
                {t('rename')}
              </span>
              <IoIosArrowForward className={`mr-2 ${locale === 'ar' ? 'rotate-180' : ''}`}/>
            </button>
            <button className={`w-full py-2  border-b rounded-lg flex items-center justify-between text-red-500 `}>
              <span className="flex items-center gap-2">
                <MdDelete className="mr-2" />
                {t('delete')}
              </span>
              <IoIosArrowForward className={`mr-2 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsModal;
