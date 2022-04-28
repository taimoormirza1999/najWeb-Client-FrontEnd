const DownloadApps = () => {
  return (
    <div className="container mx-auto text-center">
      <h3 className="text-dark-blue text-center text-5xl font-semibold">
        Download Application
      </h3>
      <p className="text-dark-blue py-8 text-4xl">
        Download <span className="font-bold">NEJOUM</span> ALJAZEERA application
        for complete logistics&apos; services experience
      </p>
      <ul className="py-20">
        <li className="inline-block">
          <img
            className="h-24"
            src="/assets/images/apple-store-icon.png"
            alt="iOS App"
          />
        </li>
        <li className="ml-24 inline-block">
          <img
            className="h-24"
            src="/assets/images/google-store-icon.png"
            alt="Andriod App"
          />
        </li>
      </ul>
    </div>
  );
};

export default DownloadApps;
