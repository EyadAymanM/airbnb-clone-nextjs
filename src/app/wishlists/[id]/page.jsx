import Map from "@/app/_components/Map/Map";

const heartIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="16px" height="16px">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
</svg>`;

const Page = () => {
  const locations = [
    {
      coordinates: [26.9135119, 31.4641516],
      content: `$543 ${heartIconHtml}`,
    },
    {
      coordinates: [40.712776, -74.005974],
      content: `$424 ${heartIconHtml}`,
    },
    {
      coordinates: [51.505, -0.09],
      content: `$446 ${heartIconHtml}`,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
    <div className="lg:w-2/3 w-full mx-3">
      <p className="text-center lg:text-left">Left content goes here</p>
    </div>
    <div className="lg:w-1/3 w-full">
      <Map locations={locations} />
    </div>
  </div>
  );
};

export default Page;
