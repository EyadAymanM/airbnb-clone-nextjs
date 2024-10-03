

const Heading = ({ title, center, subtitle , className }) => {
  return (
    <div className={`${center} ? "text-center" : "text-start" my-3 ${className}`}>
      <div className="text-2xl font-semibold">{title}</div>
      <div className="font-light text-neutral-500 ">{subtitle}</div>
    </div>
  );
};

export default Heading;
