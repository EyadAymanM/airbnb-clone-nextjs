import { Link } from '@/i18n/routing'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getTranslations } from 'next-intl/server'
import NavBar from '@/app/_components/Navbar/NavBar'
import Footer from '@/app/_components/Footer/Footer'

export default async function page() {
  const t = await getTranslations("invite")
  return (
    <>
    <NavBar />
      <h1 className="container mx-auto px-20 mb-20 mt-10 text-3xl font-bold tracking-tight text-gray-900 dark:text-white" >{t("1")}</h1>
      <div className="container mx-auto px-20  mb-20 flex justify-between ">
        <div className=''>
          <h2 className='mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{t("2")}</h2>
          <p className='text-gray-500'>{t("3")}</p>
          <p className='text-gray-500'> {t("4")}<Link href={'#'} className='text-2x underline'> {t("5")}</Link>.</p>
        </div>
        <div className='w-5/12'>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t("6")}</AccordionTrigger>
              <AccordionContent>
                {t("7")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{t("8")}</AccordionTrigger>
              <AccordionContent>
                {t("9")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Footer position={"fixed"}/>
    </>
  )
}
