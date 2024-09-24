

const Heading = ({ title, center, subtitle }) => {
  return (
    <div className={`${center} ? "text-center" : "text-start" my-8`}>
      <div className="text-2xl font-semibold">{title}</div>
      <div className="font-light text-neutral-500 mt-1">{subtitle}</div>
    </div>
  );
};

export default Heading;
