import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function page() {
  return (
    <>
                  <h1 className="container mx-auto px-20 mb-20 mt-10 text-3xl font-bold tracking-tight text-gray-900 dark:text-white" >Guest referrals</h1>
                  <div className="container mx-auto px-20  mb-20 flex justify-between ">
                    <div className=''>
                      <h2 className='mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Common questions</h2>
                      <p className='text-gray-500'>Check out these answers to common questions and review other</p>
                      <p className='text-gray-500'> program information in the<Link href={'#'} className='text-2x underline'> Help Center</Link>.</p>
                    </div>
                    <div className='w-5/12'>
                         <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                              <AccordionTrigger>Is the referral program still open?</AccordionTrigger>
                              <AccordionContent>
                                  The referrals program is no longer open and no new invites can be sent.
                                  If you were sent a coupon prior to the shutdown of the program, you will be able to use the coupon on any booking made prior to the expiration of the coupon.
                                  Sender credits will be honored till they expire. For prior referrals, you will receive credit upon completion of successful stay if the coupon is used prior to expiry (credit amount based on offer at the time).
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                              <AccordionTrigger>I referred a friend but did not get travel credit</AccordionTrigger>
                              <AccordionContent>
                              For referrals made after Oct 1, 2020, Airbnb does not offer travel credit for referrals.
                              </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                  </div>
    </>
  )
}
