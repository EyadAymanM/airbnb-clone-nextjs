'use client'

import { useState, useEffect, useRef } from 'react'

export default function StickyNav() {
  const [isSticky, setIsSticky] = useState(false)
  const triggerRef = useRef (null)
  const navRef = useRef (null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsSticky(e.intersectionRatio < 1)
      },
      { threshold: [1] }
    )

    if (triggerRef.current) {
      observer.observe(triggerRef.current)
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current)
      }
    }
  }, [triggerRef])

  return (
    <>
      {/* Placeholder div to trigger the sticky nav */}
      <div ref={triggerRef} className="h-1" />

      {/* Sticky Navigation */}
      <div
        ref={navRef}
        className={`${isSticky ? 'fixed top-0 left-0 right-0 border-b' : 'hidden'
          } bg-white z-10 transition-all duration-300 ease-in-out `}
      >
        <nav className="container  px-20 mx-[120px] py-4 mt-3 pb-0 font-airbnb">
          <ul className="flex justify-start gap-6">
            <li className='border-b-4 border-b-transparent hover:border-b-black pb-4 cursor-pointer transition ease-in-out'>
              <a href="#photos" className="text-black">
                Photos
              </a>
            </li>
            <li className='border-b-4 border-b-transparent hover:border-b-black pb-4 cursor-pointer transition ease-in-out'>
              <a href="#" className="text-black">
                Amenities
              </a>
            </li>
            <li className='border-b-4 border-b-transparent hover:border-b-black pb-4 cursor-pointer transition ease-in-out'>
              <a href="#" className="text-black">
                Reviews
              </a>
            </li>
            <li className='border-b-4 border-b-transparent hover:border-b-black pb-4 cursor-pointer transition ease-in-out'>
              <a href="#" className="text-black">
                Location
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}