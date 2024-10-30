import Image from "next/image";
import Link from "next/link";

const ListingEditorList = ({ listings }) => {
  return (
    <div className="space-y-4">
      {listings.map((listing, index) => (
        <Link
          href={`/hosting/listings/${listing._id}/photo-tour`}
          key={index}
          className="grid grid-cols-1 sm:grid-cols-4 gap-6 bg-white p-4 sm:p-6 shadow-md rounded-xl transition-all hover:shadow-lg hover:cursor-pointer hover:bg-gray-50 items-center"
        >
          <div className="flex space-x-4 items-center col-span-1 sm:col-span-2">
            <Image
              width={64}
              height={64}
              alt={listing.title}
              src={listing.photos[0]}
              className="w-16 h-16 bg-gray-300 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold text-lg text-gray-800">{listing.title}</p>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-1 text-gray-600">
            {`${listing.address.street}, ${listing.address.city}, ${listing.address.governorate}, ${listing.address.country}`}
          </div>
          <div className="col-span-1 sm:col-span-1 flex justify-center">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
                  ${
                    listing.verified
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
            >
              {listing.verified ? "Verified" : "Verification required"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListingEditorList;