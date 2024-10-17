function Footer() {
  return (
    <>
      <div className="w-full border-t fixed bottom-0 start-0 end-0 bg-white z-10">

        <div className="py-2 border-b">

          <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-5 px-4">

            <div className="flex flex-row justify-between py-1 gap-3 md:gap-0">

              <div className="flex gap-2 grow items-center font-airbnb text-sm">
                <span>© 2024 Airbnb, Inc.</span>

                <span>·</span>

                <a className="hover:underline" target="_blank" href="https://www.airbnb.com/terms">Terms</a>

                <span>·</span>

                <a className="hover:underline" target="_blank" href="https://www.airbnb.com/sitemaps/v2">Sitemap</a>

                <span>·</span>

                <a className="hover:underline" target="_blank" href="https://www.airbnb.com/terms/privacy_policy">Privacy</a>

                <span>·</span>

                <a className="hover:underline" target="_blank" href="https://www.airbnb.com/help/sale-share-opt-out">Your Privacy Choices</a>
              </div>


            <button className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{ display: "block", height: 16, width: 16, fill: "currentcolor" }}
                >
                  <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z" />
                </svg>
                <span className="hover:underline pb-[2px] text-sm">{<>English</>||English}</span>
            </button>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}
export default Footer