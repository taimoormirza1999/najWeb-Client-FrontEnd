import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

const DownloadApps = () => {
  return (
    <div className="container mx-auto text-center">
      <h3 className="text-dark-blue text-center text-2xl font-semibold md:text-5xl">
        <FormattedMessage id="Download.Application" />
      </h3>
      <p className="text-dark-blue py-4 text-xl md:py-8 md:text-3xl">
        <FormattedMessage id="Download.Application.Desc" />
        <span className="font-sen">
          <span className="font-bold">
            <FormattedMessage id="page.company.name.nejoum" />
          </span>
          <FormattedMessage id="page.company.name.aljazeera" />
        </span>
        <FormattedMessage id="Download.Application.Desc1" />
      </p>
      <ul className="py-4 md:py-16">
        <li className="inline-block">
          <a href="https://apps.apple.com/ae/app/nejoum-al-jazeera/id1542084948">
            <img
              className="h-10 md:h-20"
              src="/assets/images/apple-store-icon.png"
              alt="iOS App"
            />
          </a>
        </li>
        <li className="inline-block ltr:ml-4 rtl:mr-4 md:ltr:ml-24 md:rtl:mr-24">
          <a href="https://play.google.com/store/apps/details?id=com.nejoumapp&hl=en&gl=US">
            <img
              className="h-10 md:h-20"
              src="/assets/images/google-store-icon.png"
              alt="Andriod App"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DownloadApps;
