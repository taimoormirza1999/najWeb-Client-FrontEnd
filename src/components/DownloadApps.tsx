const DownloadApps = () => {
  return (
    <div className="container mx-auto text-center">
      <h3 className="text-dark-blue text-center text-2xl md:text-5xl font-semibold">
        Download Application
      </h3>
      <p className="text-dark-blue py-4 md:py-8 text-xl md:text-3xl">
        Download <span className="font-bold">NEJOUM</span> ALJAZEERA application
        for complete logistics&apos; services experience
      </p>
      <ul className="py-4 md:py-16">
        <li className="inline-block">
          <img
            className="h-10 md:h-24"
            src="/assets/images/apple-store-icon.png"
            alt="iOS App"
          />
        </li>
        <li className="ml-4 md:ml-24 inline-block">
          <img
            className="h-10 md:h-24"
            src="/assets/images/google-store-icon.png"
            alt="Andriod App"
          />
        </li>
      </ul>
    </div>
  );
};

export default DownloadApps;
