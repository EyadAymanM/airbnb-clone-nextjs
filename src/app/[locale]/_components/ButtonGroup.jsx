import React from "react";

const ButtonGroup = ({ onClick, className, ariaLabel, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white text-gray-700 border border-gray-200 rounded-full px-5 py-2 hover:border-gray-900 transition duration-300 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default ButtonGroup;