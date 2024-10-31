"use client";
import {Link} from "@/i18n/routing";

const CardEditor = ({
  title,
  description,
  buttonLabel,
  onClick,
  activated,
  href,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`w-[300px] p-5 bg-white border rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition duration-200 
                  ${activated ? "border-black" : "border-gray-300"}`}
    >
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {buttonLabel && (
        <button
          onClick={onClick}
          className="mt-4 py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          {buttonLabel}
        </button>
      )}
    </Link>
  );
};

export default CardEditor;
