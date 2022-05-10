const DownloadApps = () => {
  return (
    <div className="container mx-auto text-center">
      <h3 className="text-dark-blue text-center text-2xl font-semibold md:text-5xl">
        Download Application
      </h3>
      <p className="text-dark-blue py-4 text-xl md:py-8 md:text-3xl">
        Download <span className="font-sen font-bold">NEJOUM</span> ALJAZEERA
        application for complete logistics&apos; services experience
      </p>
      <ul className="py-4 md:py-16">
        <li className="inline-block">
          <img
            className="h-10 md:h-20"
            src="/assets/images/apple-store-icon.png"
            alt="iOS App"
          />
        </li>
        <li className="ml-4 inline-block md:ml-24">
          <img
            className="h-10 md:h-20"
            src="/assets/images/google-store-icon.png"
            alt="Andriod App"
          />
        </li>
      </ul>
    </div>
  );
};

export default DownloadApps;
