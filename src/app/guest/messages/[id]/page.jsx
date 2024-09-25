'use client'
import search from '@/app/_assets/svgs/search.svg'
import setting from '@/app/_assets/svgs/setting.svg'
import { Section } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
const Page = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const toggleSearch = ()=>{
    setSearchOpen(!searchOpen)
  }
  return (
    <>
      <div className="flex">
        <div className="w-[26.25rem] h-[calc(100vh-5rem)] border-t border-[#ededed]">
          <div className='flex flex-col'>
            <div className={`flex justify-between ml-12 mr-10 mt-7 ${searchOpen?'hidden':''}`}>
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
            <div></div>
          </div>
        </div>
        <div className="grow w-[26.25rem] h-[calc(100vh-5rem)] text-6xl border-t border-l border-r border-[#ededed]">MID</div>
        <div className="w-[26.25rem] h-[calc(100vh-5rem)] text-6xl border-t border-[#ededed]">RIGHT</div>
      </div>
    </>
  )
}
export default Page