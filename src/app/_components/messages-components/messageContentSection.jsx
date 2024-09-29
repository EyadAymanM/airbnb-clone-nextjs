import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";
import rightarrow from "@/app/_assets/svgs/right-arrow.svg";
import gallery from "@/app/_assets/svgs/gallery.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const messageSettings = [
  {
    title: "Mark as Read",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M11 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H15.2C16.8802 18 17.7202 18 18.362 17.673C18.9265 17.3854 19.3854 16.9265 19.673 16.362C20 15.7202 20 14.8802 20 13.2V13M20.1213 3.87868C21.2929 5.05025 21.2929 6.94975 20.1213 8.12132C18.9497 9.29289 17.0503 9.29289 15.8787 8.12132C14.7071 6.94975 14.7071 5.05025 15.8787 3.87868C17.0503 2.70711 18.9497 2.70711 20.1213 3.87868Z"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Star",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
          stroke="#1C274C"
          stroke-width="1.5"
        />
      </svg>
    ),
  },
  {
    title: "Archive",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M16 14L12.5 17.5L9 14M4.5 7.5V20.5H20.5V7.5L18.5 4.5H6.5L4.5 7.5Z"
          stroke="#121923"
          stroke-width="1.2"
        />
        <path d="M12.5 10.5V17" stroke="#121923" stroke-width="1.2" />
        <path d="M4.5 7.5H20.5" stroke="#121923" stroke-width="1.2" />
      </svg>
    ),
  },
];
const messages = [
  {
    avatar: "https://github.com/shadcn.png",
    sender: "Mostafa Mowad",
    type: "sender",
    content:
      "Hi Eyad, I was checking if the listing is still available for reservation?",
    time: new Date(2024, 8, 28, 15, 44),
  },
  {
    avatar: "https://github.com/shadcn.png",
    sender: "Mostafa Mowad",
    type: "receiver",
    content: "Yes it is, how many nights are you going to stay?",
    time: new Date(2024, 8, 28, 16, 10),
  },
  {
    avatar: "https://github.com/shadcn.png",
    sender: "Mostafa Mowad",
    type: "sender",
    content:
      "Hi Eyad, I was checking if the listing is still available for reservation?",
    time: new Date(2024, 8, 28, 15, 44),
  },
  {
    avatar: "https://github.com/shadcn.png",
    sender: "Mostafa Mowad",
    type: "receiver",
    content: "Yes it is, how many nights are you going to stay?",
    time: new Date(2024, 8, 28, 16, 10),
  },
  {
    avatar: "https://github.com/shadcn.png",
    sender: "Mostafa Mowad",
    type: "sender",
    content:
      "Hi Eyad, I was checking if the listing is still available for reservation?",
    time: new Date(2024, 8, 28, 15, 44),
  },
  {
    avatar: "https://github.com/shadcn.png",
    sender: "Mostafa Mowad",
    type: "receiver",
    content: "Yes it is, how many nights are you going to stay?",
    time: new Date(2024, 8, 28, 16, 10),
  },
  {
    avatar: "https://github.com/shadcn.png",
    sender: "Mostafa Mowad",
    type: "sender",
    content:
      "Hi Eyad, I was checking if the listing is still available for reservation?",
    time: new Date(2024, 8, 28, 15, 44),
  },
  {
    avatar: "https://github.com/shadcn.png",
    sender: "Mostafa Mowad",
    type: "receiver",
    content: "Yes it is, how many nights are you going to stay?",
    time: new Date(2024, 8, 28, 16, 10),
  },
];
const MessageContentSection = () => {
  const [isHoverd, setIsHoverd] = useState(false);
  const hoverOver = () => {
    setIsHoverd(true);
  };
  const hoverOut = () => {
    setIsHoverd(false);
  };
  return (
    <>
      <div
        className="flex flex-col border-b border-[#ededed]"
        onMouseEnter={hoverOver}
        onMouseLeave={hoverOut}
      >
        <Dialog>
          <DialogTrigger>
            <div className="h-[72px] cursor-pointer flex gap-2 items-center ps-12 grow">
              <Avatar className="w-10 h-10 mr-2">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h3 className="text-[1.4rem] font-airbnb font-bold">
                Airbnb Support{" "}
                <Image
                  className={`${isHoverd ? "inline" : "hidden"}  ms-1`}
                  src={rightarrow}
                  alt=""
                  height="12"
                  width="12"
                />
              </h3>
            </div>
          </DialogTrigger>
          <DialogContent className="bg-white border rounded-xl p-0 h-[90vh] max-w-[36%]">
            <DialogHeader>
              <DialogTitle className="text-center mb-4 mt-5">
                Messaging settings
              </DialogTitle>
              <DialogDescription className="p-0">
                <ul className="">
                  <h1 className="px-12 text-2xl font-medium">
                    Conversation actions
                  </h1>
                  {messageSettings.map((setting) => {
                    return (
                      <li
                        key={setting.title}
                        className="w-full cursor-pointer text-xl hover:bg-[#f7f7f7] px-12 py-3 my-4 flex gap-4 text-[#444]"
                      >
                        {setting.icon}
                        {setting.title}
                      </li>
                    );
                  })}
                </ul>
                <h1 className="px-12 text-2xl font-medium">Support</h1>
                <div className="w-[92%] cursor-pointer text-lg hover:bg-[#f7f7f7] px-12 py-4 my-4 ms-5 flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#1C274C"
                      stroke-width="1.5"
                    />
                    <path
                      d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
                      stroke="#1C274C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <circle cx="12" cy="16" r="1" fill="#1C274C" />
                  </svg>
                  Visit the Help Center
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="pt-8 flex flex-col grow  overflow-y-scroll relative">
        <h1 className="text-[#666] text-[14px] text-center font-airbnb ">
          Today
        </h1>
        <div className="grow flex flex-col mx-12 gap-1">
          {messages.map((message) => (
            <div key={message.sender} className={`flex flex-col ${message.type == "sender"?'':'self-end'}`}>
              <p className={`${message.type == "sender" ?'ms-4':'me-4 self-end'} text-xs text-[#6a6a6a] mb-1 `}>{message.time.toLocaleTimeString("en-US"||"ar-EG",{hour:"2-digit",minute:'2-digit'})}</p>
              <div
                className={`${
                  message.type == "sender"
                    ? "bg-[#f7f7f7] text"
                    : "bg-black text-white"
                } rounded-xl p-4 w-fit max-w-[38rem] text-base`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full px-8 bg-white sticky bottom-0 pb-5 pt-3 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="me-5">
                  <Image src={gallery} width="24" height="24" alt="" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white p-0 rounded-2xl shadow-lg">
                <p className="p-4 rounded-2xl">Upload image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <form className="grow">
            <input
              type="search"
              id="search"
              className="w-full block w- p-2 py-2 ps-11 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:border-none"
              placeholder="Type a message"
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default MessageContentSection;
