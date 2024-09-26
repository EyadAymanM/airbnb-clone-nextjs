import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { useState } from "react"
import rightarrow from "@/app/_assets/svgs/right-arrow.svg"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const MessageContentSection = () => {
  const [isHoverd, setIsHoverd] = useState(false)
  const hoverOver = () => {
    setIsHoverd(true)
  }
  const hoverOut = () => {
    setIsHoverd(false)
  }
  return (
    <>
      <div className="flex flex-col border-b border-[#ededed]" onMouseEnter={hoverOver} onMouseLeave={hoverOut}>
        <Dialog>
        <DialogTrigger>
          <button className="h-[72px] flex gap-2 items-center ps-12 grow">
            <Avatar className="w-10 h-10 mr-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className='text-[1.4rem] font-airbnb font-bold'>Airbnb Support <Image className={`${isHoverd ? 'inline' : 'hidden'}  ms-1`} src={rightarrow} alt="" height="12" width="12" /></h3>
          </button>
        </DialogTrigger>
          {/* <DialogTrigger>Open</DialogTrigger> */}
          <DialogContent className="bg-white border rounded-3xl">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        
      </div>
      
    </>
  )
}
export default MessageContentSection



