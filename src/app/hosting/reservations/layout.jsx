'use client'
import Heading from '@/app/_components/Heading'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'


export default function FunctionalMenu({ children }) {
  const router = useRouter()
  const path = usePathname().slice(1).split('/')
  const active = !(path[path.length - 1] == "reservations") ? path[path.length - 1] : "Upcoming"
  const [activeTab, setActiveTab] = useState(active)
  const tabs = ['Upcoming', 'Completed', 'Canceled', 'All']

  return (
    <>
      <div className='mx-10 mt-5'>
        <button className='-ms-2 hover:bg-[#f7f7f7] p-3 rounded-full' onClick={router.back}><ChevronLeft /></button>
        <Heading title={"Reservations"} className="font-airbnb" />
        <nav className="border-b-2 border-gray-200 font-airbnb">
          <ul className="flex space-x-4">
            {tabs.map((tab) => (
              <li key={tab}>
                <span className='hover:bg-[#f7f7f7] py-3 px-2 rounded-xl tracking-tight'>
                  <Link
                    href={`/hosting/reservations/${tab.toLowerCase()}`}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 inline-flex items-center border-b-2 font-medium text-base ${activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:border-gray-300'
                      }`}
                  >
                    {tab}
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </div>
    </>
  )
}