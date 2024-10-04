import React from 'react'

export default function page() {
  return (
    <>
        <div className='container mx-auto px-20'>
            <h1 className="mb-20 mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white" >Global preferences</h1>
            <div className='flex justify-between mb-20 '>
                <div className='w-full'>
                    <form className="w-full max-w-lg">
                        <label>Preferred language</label>
                        <div className="flex  items-center border-b border-grye-500  mb-10">
                          <input disabled className="appearance-none bg-transparent border-none w-screen text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="English"  aria-label="Full name" />
                          <p className='text-gray-300 mb-3'>Edit</p>
                        </div>

                        <label>Preferred currency</label>
                        <div className="flex items-center border-b border-grye-500 py-2 mb-10">
                          <input disabled className="appearance-none bg-transparent border-none w-screen text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Egyptian pound"  aria-label="Full name" />
                          <p className='text-gray-300 mb-3'>Edit</p>
                        </div>

                        <label>Time zone</label>
                        <div className="flex items-center border-b border-grye-500 py-2 mb-10">
                          <input disabled className="appearance-none bg-transparent border-none w-screen text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder=""  aria-label="Full name" />
                          <p className='text-gray-300 mb-3'>Edit</p>
                        </div>
                    </form>
                </div>

                <div className="  w-90 max-w-md p-4 bg-white border border-gray-200  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{height: "40px", width: "40px", display: "block", fill: "rgb(255, 180, 0)"}}><path d="m21.31 5.91a1.31 1.31 0 1 1 -1.31-1.31 1.31 1.31 0 0 1 1.31 1.31zm-8.31 9.69a1.31 1.31 0 1 0 1.31 1.31 1.31 1.31 0 0 0 -1.31-1.31zm-7-11a1.31 1.31 0 1 0 1.31 1.31 1.31 1.31 0 0 0 -1.31-1.31z"></path><path d="m22 6.5a2.5 2.5 0 0 1 -2 2.45v13.55a.5.5 0 0 1 -1 0v-13.55a2.5 2.5 0 0 1 0-4.9v-2.55a.5.5 0 0 1 1 0v2.56a2.44 2.44 0 0 1 .33.09.5.5 0 0 1 -.33.94h-.01a1.45 1.45 0 0 0 -.99.01 1.49 1.49 0 0 0 0 2.82 1.4 1.4 0 0 0 1 0 1.5 1.5 0 0 0 1-1.41 1.48 1.48 0 0 0 -.09-.52.5.5 0 0 1 .94-.35 2.5 2.5 0 0 1 .16.87zm-7.8 9.83a.5.5 0 0 0 -.29.64 1.48 1.48 0 0 1 .09.52 1.5 1.5 0 0 1 -1 1.41 1.4 1.4 0 0 1 -1 0 1.49 1.49 0 0 1 0-2.82 1.48 1.48 0 0 1 .5-.09 1.52 1.52 0 0 1 .5.08h.01a.5.5 0 0 0 .32-.94 2.46 2.46 0 0 0 -.32-.08v-13.56a.5.5 0 0 0 -1 0v13.55a2.5 2.5 0 0 0 0 4.9v2.55a.5.5 0 0 0 1 0v-2.55a2.5 2.5 0 0 0 1.84-3.32.5.5 0 0 0 -.64-.29zm-7-11a .5.5 0 0 0 -.29.64 1.48 1.48 0 1 1 -1.41-.98 1.47 1.47 0 0 1 .49.08h.01a.5.5 0 0 0 .33-.94 2.44 2.44 0 0 0 -.33-.09v-2.56a.5.5 0 0 0 -1 0v2.55a2.5 2.5 0 0 0 0 4.9v13.55a.5.5 0 0 0 1 0v-13.55a2.5 2.5 0 0 0 1.84-3.32.5.5 0 0 0 -.64-.29z" fill="#484848"></path></svg>
                  <p className="mb-5 mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >Your global preferences</p>
                  <p className="mb-5 text-gray-500">Changing your currency updates how you see prices. You can change how you get payments in your payments & payouts preferences.</p>
                </div>
            </div>

        </div>
    </>
  )
}
