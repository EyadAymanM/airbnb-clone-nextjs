import Image from "next/image";
import {Link} from "@/i18n/routing";
import img from "../_assets/image.png";
import Heading from "./Heading";
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
const RecentlyViewed = () => {
  const locale = useLocale();
  const t = useTranslations('RecentlyViewed');
  let images = [
    {
      src: img,
      alt: "Image 1",
      rounded: 'rounded-tl-3xl',
      link: '/image1',
      rounded: locale === 'en' ? 'rounded-tl-3xl' : 'rounded-tr-3xl'
    },
    {
      src: img,
      alt: "Image 2",
      rounded: 'rounded-tr-3xl',
      link: '/image2',
      rounded: locale === 'en' ? 'rounded-tr-3xl' : 'rounded-tl-3xl'
    },
    {
      src: img,
      alt: "Image 3",
      rounded: 'rounded-bl-3xl',
      link: '/image3',
      rounded: locale === 'en' ? 'rounded-bl-3xl' : 'rounded-br-3xl'
    },
  ];
  return (
    <div >
      <div className="grid grid-cols-2 gap-1 rounded-3xl shadow-lg p-2 bg-white border-solid border-white border-spacing-1 hover:shadow-xl transition-shadow duration-200 ease-in-out max-w-sm">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-0 pb-[100%]"
          >
            <Link href={image.link || "#"} aria-label={`Link to ${image.alt}`}>
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className={image.rounded}
              />
            </Link>
          </div>
        ))}
        <div className={`flex items-center justify-center bg-gray-200 ${locale === 'en' ? 'rounded-br-3xl' : 'rounded-bl-3xl'}`}>
        </div>
      </div>
      <Heading title={t('recently-viewed')} subtitle={t('yesterday')} />
    </div>
  );
};

export default RecentlyViewed;

