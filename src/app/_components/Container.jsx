const Container = ({ children }) => {
  return (
    <div
      className="
        max-w-[2520px]
        mt-5
        mx-auto
        xl:px-20
        md:px-10
        sm:px-5
        px-4
      "
    >
      {children}
    </div>
  );
};

export default Container;
