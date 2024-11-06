import Footer from "@/app/_components/Footer/Footer";
import NavBar from "@/app/_components/Navbar/NavBar";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function page() {
  const t = await getTranslations("work");
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-20">
        <h1 className="mb-20 mt-10 text-4xl font-bold tracking-tight text-gray-700 dark:text-white">
          {t("1")}
        </h1>
        <div className="flex justify-between mb-20">
          <div className=" mb-20 ">
            <p className=" mt-10 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
              {t("2")}
            </p>
            <p className=" mt-10 text-1xl  tracking-tight text-gray-900 dark:text-white">
              {t("3")}
            </p>
            <div className="w-full">
              <form className="w-full max-w-lg">
                <label className="font-bold text-gray-700">
                  {t("4")}
                </label>
                <div className="   mb-10">
                  <input
                    className="outline-none border-b border-gray-300 appearance-none bg-transparent text-3xl  w-full rounded  text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="email"
                    placeholder=""
                    aria-label="Full name"
                  />
                </div>
                <button
                  type="button"
                  class="inline-block rounded bg-gray-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                >
                  {t("5")}
                </button>
              </form>
            </div>
          </div>
          <div className="  w-80 max-w-md  bg-white border border-gray-200  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="">
              <svg
                viewBox="0 0 24 24"
                role="presentation"
                aria-hidden="true"
                focusable="false"
                style={{
                  height: "32px",
                  width: "32px",
                  display: "block",
                  fill: "rgb(255, 90, 95)",
                }}
              >
                <path d="M5,15.79289V6.5A.5.5,0,0,1,5.5,6h9.29289a.5.5,0,0,1,.35356.85355l-9.2929,9.2929A.5.5,0,0,1,5,15.79289Z"></path>
                <path
                  fill="#484848"
                  d="M17.5,0H5.5A2.64711,2.64711,0,0,0,3,2.5v19A2.64716,2.64716,0,0,0,5.5,24H9a.5.5,0,0,0,0-1H5.5A1.65724,1.65724,0,0,1,4,21.5V21H7.5a.5.5,0,0,0,0-1H4V5H19v6.5a.5.5,0,0,0,1,0v-9A2.569,2.569,0,0,0,17.5,0ZM4,4V2.5A1.65719,1.65719,0,0,1,5.5,1h12A1.57151,1.57151,0,0,1,19,2.5V4Zm8-1.5a.5.5,0,1,1-.5-.5A.5.5,0,0,1,12,2.5Zm6.5,11a1.63453,1.63453,0,0,0-.80481.22974A1.64484,1.64484,0,0,0,16.25,13a1.67877,1.67877,0,0,0-1.25.50494A1.67877,1.67877,0,0,0,13.75,13a1.88315,1.88315,0,0,0-.75.1601V9.5A1.43545,1.43545,0,0,0,11.5,8,1.43545,1.43545,0,0,0,10,9.5v5.29285l-.14642-.14643c-1.09345-1.09344-2.42365-1.28344-3.20716-.5a.5.5,0,0,0-.09362.57715A59.00214,59.00214,0,0,0,9.584,20.27734C10.98157,22.72552,12.80225,24,15,24c3.18756,0,5-2.1145,5-5.5V15A1.40476,1.40476,0,0,0,18.5,13.5Zm.5,5c0,2.8645-1.40186,4.5-4,4.5-1.80225,0-3.31494-1.0589-4.56586-3.24811a54.88427,54.88427,0,0,1-2.78039-5.06378,1.73479,1.73479,0,0,1,1.49267.66541l1,1A.5.5,0,0,0,11,16h0V9.5a.5.5,0,0,1,1,0v5h.0094a.49287.49287,0,0,0,.36932.485.5.5,0,0,0,.60633-.36377A.69127.69127,0,0,1,13.75,14a.69127.69127,0,0,1,.765.62128.46769.46769,0,0,0,.02924.0614.4927.4927,0,0,0,.04492.09442.90137.90137,0,0,0,.13391.13385.489.489,0,0,0,.094.04474.46454.46454,0,0,0,.0617.02936c.00739.00183.01453-.00055.02191.001a1.08028,1.08028,0,0,0,.19874,0c.00738-.00152.01452.00086.02191-.001a.46272.46272,0,0,0,.06158-.0293.48739.48739,0,0,0,.09424-.04486.90526.90526,0,0,0,.13379-.13379.4927.4927,0,0,0,.04492-.09442.46769.46769,0,0,0,.02924-.0614.78156.78156,0,0,1,1.5299,0c.00287.01147.01105.01965.01465.03076a.70055.70055,0,0,0,.0979.173c.00769.00885.0105.02008.01892.02851a.469.469,0,0,0,.04883.03241.48729.48729,0,0,0,.08472.05627.60333.60333,0,0,0,.181.05017.48562.48562,0,0,0,.10223-.00464.47553.47553,0,0,0,.05811-.00268c.01147-.00287.01965-.011.03076-.01465a.48393.48393,0,0,0,.09021-.04291.49086.49086,0,0,0,.08282-.05505c.00885-.00769.02008-.0105.02851-.01892A.97361.97361,0,0,1,18.5,14.5c.36829,0,.5.158.5.5Zm-1-2v2a.5.5,0,0,1-1,0v-2a.5.5,0,0,1,1,0Z"
                ></path>
              </svg>
              <p className="mb-5 text-gray-800 text-2xl font-bold">
                {t("6")}
              </p>
              <p className="mb-5 text-gray-500">
                {t("7")}
              </p>
            </div>
            <div>
              <svg
                viewBox="0 0 24 24"
                role="presentation"
                aria-hidden="true"
                focusable="false"
                style={{
                  height: "32px",
                  width: "32px",
                  display: "block",
                  fill: "rgb(255, 90, 95)",
                }}
              >
                <path d="m17.3 6.54v3.32a.43.43 0 0 1 -.43.43h-1.71a.43.43 0 0 1 -.43-.43v-3.32a.21.21 0 0 1 .09-.17l1.07-.77a.21.21 0 0 1 .25 0l1.07.77a.21.21 0 0 1 .09.17zm-2.8 12.46h-2a .5.5 0 0 0 0 1h2a .5.5 0 0 0 0-1zm-4 0h-.5v-.5a.5.5 0 0 0 -1 0v .5h-.5a.5.5 0 0 0 0 1h .5v.5a.5.5 0 0 0 1 0v-.5h.5a.5.5 0 0 0 0-1zm-.16-15.96a1.18 1.18 0 1 0 1.18 1.18 1.18 1.18 0 0 0 -1.18-1.18z"></path>
                <path
                  d="m8.5 17a .5.5 0 1 1 .5-.5.5.5 0 0 1 -.5.5zm.5-2.5a.5.5 0 1 0 -.5.5.5.5 0 0 0 .5-.5zm1.5.5h4a .5.5 0 0 0 0-1h-4a .5.5 0 0 0 0 1zm0 2h4a .5.5 0 0 0 0-1h-4a .5.5 0 0 0 0 1zm8.5-11v5.5a.5.5 0 0 1 -.5.5h-.5v11.5a.5.5 0 0 1 -.85.35l-1.65-1.65-1.65 1.65a.5.5 0 0 1 -.71 0l-1.65-1.65-1.65 1.65a.5.5 0 0 1 -.71 0l-1.65-1.65-1.65 1.65a.5.5 0 0 1 -.85-.35v-12.5a.5.5 0 0 1 1 0v11.29l1.15-1.15a.5.5 0 0 1 .71 0l1.65 1.65 1.65-1.65a.5.5 0 0 1 .71 0l1.65 1.65 1.65-1.65a.5.5 0 0 1 .71 0l1.15 1.15v-10.29h-3.5a.5.5 0 0 1 -.5-.5v-2.5h-7.5a.5.5 0 0 1 0-1h7.5v-2a .5.5 0 0 1 .19-.39l2.5-2a .5.5 0 0 1 .62 0l2.5 2a .5.5 0 0 1 .19.39zm-1 .24-2-1.6-2 1.6v4.76h4zm-8.72.61a2.22 2.22 0 0 0 2.62-2.98.5.5 0 0 0 -.93.38 1.21 1.21 0 1 1 -.8-.71.5.5 0 0 0 .26-.97 2.21 2.21 0 1 0 -1.15 4.28zm3.22-4.85h.5v.5a.5.5 0 0 0 1 0v-.5h.5a.5.5 0 0 0 0-1h-.5v-.5a.5.5 0 0 0 -1 0v .5h-.5a.5.5 0 0 0 0 1z"
                  fill="#484848"
                ></path>
              </svg>
              <p className="mb-5 text-gray-800 text-2xl font-bold">
                {t("8")}
              </p>
              <p className="mb-5 text-gray-500">
                {t("9")}
              </p>
            </div>
            <div>
              <svg
                viewBox="0 0 24 24"
                role="presentation"
                aria-hidden="true"
                focusable="false"
                style={{
                  height: "32px",
                  width: "32px",
                  display: "block",
                  fill: "rgb(255, 90, 95)",
                }}
              >
                <path d="m13.0429 20.4868c-.252.108-.56-.037-.56-.318l-.079-16.225c0-.327.404-.491.639-.26 1.491 1.462 4.438 2.852 6.897 3.197.161.022.288.143.316.299 1.089 6.046-2.202 11.152-7.213 13.307"></path>
                <path
                  d="m13.998 11.0102h-4v-2c0-1.104.896-2 2-2s2 .896 2 2zm1.5 0h-.5v-2c0-1.657-1.343-3-3-3s-3 1.343-3 3v2h-.5c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h7c.276 0 .5-.224.5-.5v-5c0-.276-.224-.5-.5-.5z"
                  fill="#fff"
                ></path>
                <path
                  d="m12.998 10.0102h-2v-1c0-.552.448-1 1-1s1 .448 1 1zm-1-3c-1.104 0-2 .896-2 2v2h4v-2c0-1.104-.896-2-2-2zm1 6c0 .37-.201.693-.5.866v1.134c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1.134c-.299-.173-.5-.496-.5-.866 0-.552.448-1 1-1s1 .448 1 1zm3 3.5c0 .276-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5v-5c0-.276.224-.5.5-.5h.5v-2c0-1.657 1.343-3 3-3s3 1.343 3 3v2h.5c.276 0 .5.224.5.5zm0-6.415v-1.085c0-2.209-1.791-4-4-4s-4 1.791-4 4v1.085c-.583.206-1 .762-1 1.415v5c0 .828.671 1.5 1.5 1.5h7c.828 0 1.5-.672 1.5-1.5v-5c0-.653-.417-1.209-1-1.415zm-3.627 11.861c-7.206-3.07-10.097-8.274-8.751-15.741 3.612-.536 6.535-2.014 8.751-4.432 2.215 2.418 5.138 3.896 8.75 4.432 1.346 7.467-1.545 12.671-8.75 15.741zm9.684-16.294c-.042-.216-.218-.38-.436-.408-3.754-.484-6.698-2.007-8.858-4.573-.204-.242-.577-.242-.781 0-2.16 2.566-5.104 4.089-8.858 4.573-.218.028-.394.192-.436.408-1.612 8.206 1.58 14.027 9.488 17.319.126.052.267.052.392 0 7.91-3.292 11.101-9.113 9.489-17.319z"
                  fill="#484848"
                ></path>
              </svg>
              <p className="mb-5 text-gray-800 text-2xl font-bold">
                {t("10")}
              </p>
              <p className="mb-5 text-gray-500">
                {t("11")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer position={"fixed"} />
    </>
  );
}
