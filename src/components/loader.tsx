const Loader = () => {
  return (
    <div className="fixed top-0 z-[99999] h-full w-full bg-[aliceblue]">
      <div className="absolute top-1/2 left-1/2 w-8 overflow-visible pt-8">
        <img
          alt="Loading"
          className="absolute -top-4 w-24 max-w-max"
          src="/assets/images/loading-new.gif"
        ></img>
        <p className="text-azure-blue mt-8 animate-pulse whitespace-nowrap text-sm">
          Nejoum Aljazeera - Auto Shipping
        </p>
      </div>
    </div>
  );
};

export default Loader;
