'use client'
import search from '@/app/_assets/svgs/search.svg'
import setting from '@/app/_assets/svgs/setting.svg'
import close from '@/app/_assets/svgs/close.svg'
import MessageCard from '@/app/_components/messages-components/messageCard'
import MessageContentSection from '@/app/_components/messages-components/messageContentSection'
import Image from 'next/image'
import { useState } from 'react'
import MessageDetails from '@/app/_components/messages-components/messageDetails'
const Page = () => {
  const [detailsOpen, setDetailsOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }
  const closeDetails = () => {
    setDetailsOpen(false)
  }
  const openDetails = () => {
    setDetailsOpen(true)
  }
  return (
    <>
      <div className="flex">
        <div className="w-[26.25rem] max-h-[calc(100vh-5rem)] border-t border-[#ededed]  overflow-y-scroll">
          <div className='flex flex-col'>
            <div className={`flex justify-between ml-12 mr-10 mt-7 ${searchOpen ? 'hidden' : ''}`}>
              <h1 className='text-2xl font-airbnb font-semibold'>Messages</h1>
              <div className='flex gap-2 items-center'>
                <button onClick={toggleSearch} className={`w-10 h-10 rounded-full bg-[#e7e7e7] hover:bg-[#f7f7f7] `}>
                  <Image className='w-4 h-4 m-auto' src={search} alt='' width='' height='' />
                </button>
                <button className={`w-10 h-10 rounded-full bg-[#e7e7e7] hover:bg-[#f7f7f7] `}>
                  <Image className='w-4 h-4 m-auto' src={setting} alt='' width='' height='' />
                </button>
              </div>
            </div>
            <div className={`justify-between gap-2 ml-12 mr-10 mt-7 ${searchOpen ? 'flex' : 'hidden'}`}>
              <div className="relative grow">
                <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="search" className="block w-full p-2 ps-11 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:border-none" placeholder="Search all messages" required />
              </div>

              <button onClick={toggleSearch} className='font-airbnb text-sm px-4 py-2 rounded-xl hover:bg-[#f7f7f7]'>Cancel</button>
            </div>
            <div className='pt-4 mr-9'>
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
            </div>
          </div>
        </div>
        <div className="grow max-h-[calc(100vh-5rem)] text-6xl border-t border-l border-r border-[#ededed] flex flex-col relative">
          <MessageContentSection />
          <button onClick={openDetails} className={`${detailsOpen ? "hidden" : ""} transition-[width] bg-[#f7f7f7] translate-x-1 text-base font-semibold px-3 py-2 rounded-full absolute end-9 top-5 z-50`}>
            Show details
          </button>
        </div>
        <div className={`${detailsOpen?'w-[26.25rem]':'w-0'} transition-[width] duration-400 h-[calc(100vh-5rem)] text-6xl border-t border-[#ededed] relative`}>
          {/* <MessageDetails /> */}
          <button onClick={closeDetails} className={`${detailsOpen?"":"hidden"}bg-[#f7f7f7] p-[0.7rem] rounded-full absolute end-20 top-6 z-50`}>
            <Image src={close} height="16" width="16" alt='' />
          </button>
        </div>
      </div>
    </>
  )
}
export default Page