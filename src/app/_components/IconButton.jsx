"use client";

const IconButton = ({ ariaLabel, icon: Icon, click }) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={click}
      className="focus:outline-none hover:bg-gray-200 p-2 rounded-full transition duration-200 ease-in-out"
    >
      <Icon size={24} />
    </button>
  );
};

export default IconButton;