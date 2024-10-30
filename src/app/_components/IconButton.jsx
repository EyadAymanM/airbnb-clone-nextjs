"use client";

const IconButton = ({ ariaLabel, icon: Icon, onClick, classNames }) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={`focus:outline-none  p-2 rounded-full transition duration-200 ease-in-out ${classNames}`}
    >
      <Icon size={24}/>
    </button>
  );
};

export default  IconButton;