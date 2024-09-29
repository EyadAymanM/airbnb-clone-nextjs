import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const MessageDetails = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center h-[72px] border-b border-[#ededed]">
          <h1 className='ms-12  text-[1.4rem] font-airbnb font-bold'>Details</h1>
        </div>
        <div className="px-12 my-6 h-80">
          <div className="flex items-start h-20">
            <Avatar className="w-8 h-8 me-4 ">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="flex flex-col gap-3">
              <h2 className="text-lg leading-3 font-semibold">Mostafa Moawad</h2>
              <p className="text-base leading-5 text-[#555]">A message form Mostafa Mowad about the listing you published.</p>
            </div>
          </div>
          <div className="border border-[#ededed]"></div>
        </div>
      </div>
    </>
  )
}
export default MessageDetails