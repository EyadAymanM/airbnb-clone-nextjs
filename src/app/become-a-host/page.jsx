'use client'
import { ChevronRightIcon, Home } from "lucide-react";
import Container from "../_components/Container";
import { createNewListing } from "../_actions/Listing/createNewListing";
const user = {
  name: "Eyad",
};

function page() {
  const token = localStorage.getItem('token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmY2M2U1N2NkZDIxMjI0NWI3YTllMSIsImZpcnN0TmFtZSI6IkV5YWQiLCJlbWFpbCI6ImVpYWRhaW1hbkBnbWFpbC5jb20iLCJpYXQiOjE3MjgzMzM2MjksImV4cCI6MTcyODM3NjgyOX0.5CpDdk1Me4eLMBdxqq1c4DwJuRVQsnJ2lCC8R5LfXk4"

  return (
    <>
      <Container>
        <div className="flex flex-col w-[620px] mx-auto px-4 font-airbnb gap-5">
          <h1 className="text-4xl font-semibold">Welcome back, {user.name}</h1>

          <div className="font-bold text-2xl">Finish your listing</div>
          <div className="flex flex-col gap-4">
            <div className="bg-white hover:bg-[#f7f7f7] cursor-pointer shadow rounded-xl p-4 flex items-center space-x-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Home className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-base">Your listing started October 6, 2024</p>
            </div>

            <div className="bg-white hover:bg-[#f7f7f7] cursor-pointer shadow rounded-lg p-4 flex items-center space-x-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Home className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-base">Your Apartment listing started October 4, 2024</p>
            </div>
          </div>
          <div className="font-semibold text-2xl">Start a new listing</div>
          <div className="flex items-center border-b pb-3">
            <div className="me-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{display: 'block', height: '32px', width: '32px', fill: 'currentcolor'}}
              >
                <path d="M31.7 15.3 29 12.58 18.12 1.7a3.07 3.07 0 0 0-4.24 0L3 12.59l-2.7 2.7 1.4 1.42L3 15.4V28a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15.41l1.3 1.3ZM27 28H5V13.41L15.3 3.12a1 1 0 0 1 1.4 0L27 13.42ZM17 12v5h5v2h-5v5h-2v-5h-5v-2h5v-5Z"></path>
              </svg>
            </div>
            <form action=""></form>
            <div onClick={createNewListing(token)} className="flex justify-between grow cursor-pointer">
              <span>
                Create a new listing
              </span>
              <span>
                <ChevronRightIcon />
              </span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
export default page;
