import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

export default function ImageGallery({ images }) {

  return (
  <ResizablePanelGroup
    direction="horizontal"
    className="max-w rounded-lg relative min-h-80"
  >

   
  <Button className="absolute bottom-2 right-2 bg-white text-black py-1 px-3 rounded-lg shadow-lg">
    Show All photos
  </Button>
    
    <ResizablePanel
      defaultSize={50}
      className="flex items-center justify-center sm:w-full"
    >
      <Image
        src={images[0]} 
        alt="Main Image"
        width={100}
        height={100}
        priority
        className="object-cover w-full h-full"
      />
    </ResizablePanel>

    <ResizableHandle />

    <ResizablePanel defaultSize={50} className="hidden sm:block w-1/4">
      <ResizablePanelGroup direction="vertical">
       
        <ResizablePanel defaultSize={50}>
          <div className="grid grid-cols-2 gap-2 h-full ms-2">
            <Image
              src={images[1]}  
              alt="Image 1"
              width={100}
              height={100}
              priority
              className="object-cover w-full h-full"
            />
            <Image
              src={images[2]}  
              alt="Image 2"
              width={100}
              height={100}
              priority
              className="object-cover w-full h-full"
            />
            <Image
              src={images[3]}  
              alt="Image 3"
              width={100}
              height={100}
              priority
              className="object-cover w-full h-full"
            />
            <Image
              src={images[4]}  
              alt="Image 4"
              width={100}
              height={100}
              priority
              className="object-cover w-full h-full"
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
  )
}











