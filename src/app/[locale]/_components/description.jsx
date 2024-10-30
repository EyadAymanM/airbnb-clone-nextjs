'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Description({description}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const shortDescription = description
  // `
  //   Our modern penthouse with a private pool is perfect for families seeking convenience and luxury. 
  //   Located in a gated community in the upscale area of New Cairo, just 30 minutes from the airport, 
  //   and close to amenities like KFC, Starbucks, and a variety of Western and local restaurants 
  //   (Chili's, Fuddruckers, LongHorn Texas, Ibn Al Sham). Amenities like a King Bed, washer, dryer, 
  //   dishwasher, and microwave ensure comfort, and 4 smart TVs provide entertainment. 
  //   Book with us for a hassle-free stay!
  // `

  const fullDescription = `
    ${shortDescription}

    The space
    This spacious 200-square meter (2200-square feet) penthouse with large outdoor living area on roof 
    is located on the third and fourth floor with elevator access. Recently finished, it features 
    porcelain and custom tile throughout. The American kitchen is fully equipped with all the amenities 
    you need to cook a gourmet meal, including quality pots and pans, all cooking utensils, plates and 
    dishes, blender, toaster, built-in stove, built-in microwave, and large fridge. Additionally, we have 
    an LG clothes washer, clothes dryer, and dishwasher to make your stay comfortable. The property also 
    boasts four Smart TV's in the reception area, two bedrooms, and gym.

    This elegant apartment offers a master bedroom with a king-size bed, large built in closet, smart tv, 
    built-in closet, desk vanity with chair, and a private full bathroom. The second room features a 
    queen-size bed, a large built in wardrobe, a vanity/desk, and a chair, while the third bedroom has 
    two queen beds and a built in wardrobe. Additionally, custom LED colored accent lighting throughout 
    the house creates a unique ambiance that sets the mood for relaxation and comfort.

    The living room is furnished with a large sectional and two chairs, providing ample seating for a family. 
    The modern dining room table is equipped with eight chairs, and the balcony offers a lovely view of the 
    expansive garden located in front of the property. Additionally, guests have access to two full bathrooms, 
    including a private bathroom located in the master bedroom. Both bathrooms are fitted with custom tile 
    and porcelain.

    Other things to note
    All guests that will be staying in property will need to provide a passport copy before check-in for 
    foreigners or a local state ID for Egyptian nationals

    This is a new building and there is potential for some noise from other apartments in building being 
    worked on during work hours from 8:30 a.m. to 4 p.m. except holidays and Friday as no work is allowed 
    on those days. 

    Temporarily the elevator is not working, so guests will be required to use the stairs. The unit is on 
    the 3rd floor.
  `

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Modern Penthouse in New Cairo</h1> */}
      <p className="mb-4">{shortDescription}</p>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Show more</Button>
        </DialogTrigger>
        <DialogContent className=" bg-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogDescription>
            <div className="mt-4 whitespace-pre-line">{fullDescription}</div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}