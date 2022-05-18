const Loader = () => {
  return (
    <div className="fixed top-[0] z-[99999] h-[100%] w-[100%] bg-[aliceblue]">
      <div className="absolute top-[50%] left-[50%] h-[0] w-[2em] overflow-visible pt-[2em]">
        <img
          alt=""
          className="absolute top-[-1rem] w-[6rem] max-w-[inherit]"
          src="https://nejoumaljazeera.co/assets/img/loading-new.gif"
        ></img>
        <p className="float-left mt-[1em] ml-[-50%] translate-x-2/4 animate-pulse whitespace-nowrap text-[0.875em] text-[#1976d2]">
          Nejoum Al Jazeera
        </p>
      </div>
    </div>
  );
};

export default Loader;
