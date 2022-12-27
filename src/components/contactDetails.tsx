import { FormattedMessage } from 'react-intl';

const ContactDetails = () => {
  return (
    <div className="text-dark-blue py-8">
      <div className="mx-auto flex flex-col justify-between gap-8 md:flex-row lg:w-3/4 lg:gap-4">
        <div>
          <h3 className="text-dark-blue py-4 text-2xl font-semibold md:text-3xl lg:text-5xl">
            <FormattedMessage id="Phone" />
          </h3>
          <h4 className="text-dark-blue py-3 text-xl font-semibold md:text-2xl lg:text-3xl">
            <FormattedMessage id="Main" />
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <div className="dirltr rtl:text-right">
            <a
              href="tel:+971 65 440 202"
              className="text-azure-blue text-lg hover:border-0 md:text-2xl lg:text-3xl"
            >
              +971 65 440 202
            </a>
          </div>
          <h4 className="text-dark-blue mt-6 py-3 text-xl font-semibold md:text-2xl lg:text-3xl">
            <FormattedMessage id="customer.service" />
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <div className="dirltr rtl:text-right">
            <a
              href="tel:+971 65 440 202"
              className="text-azure-blue text-lg hover:border-0 md:text-2xl lg:text-3xl"
            >
              +971 65 440 202
            </a>
          </div>
          <h4 className="text-dark-blue mt-6 py-3 text-xl font-semibold md:text-2xl lg:text-3xl">
            <FormattedMessage id="Logistics_Services" />
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <div className="dirltr rtl:text-right">
            <a
              href="tel:+971 58 931 1461"
              className="text-azure-blue text-lg hover:border-0 md:text-2xl lg:text-3xl"
            >
              +971 58 931 1461
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-dark-blue py-4 text-2xl font-semibold md:text-3xl lg:text-5xl">
            <FormattedMessage id="Email" />
          </h3>
          <h4 className="text-dark-blue py-3 text-xl font-semibold md:text-2xl lg:text-3xl">
            <FormattedMessage id="Main" />
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <a
            href="mailto:info@naj.ae"
            className="text-azure-blue text-lg hover:border-0 md:text-2xl lg:text-3xl"
          >
            info@naj.ae
          </a>
          <h4 className="text-dark-blue mt-6 py-3 text-xl font-semibold md:text-2xl lg:text-3xl">
            <FormattedMessage id="customer.service" />
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <a
            href="mailto:cservice@naj.ae"
            className="text-azure-blue text-lg hover:border-0 md:text-2xl lg:text-3xl"
          >
            cservice@naj.ae
          </a>
          <h4 className="text-dark-blue mt-6 py-3 text-xl font-semibold md:text-2xl lg:text-3xl">
            <FormattedMessage id="Logistics_Services" />
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <a
            href="mailto:logistics@naj.ae"
            className="text-azure-blue text-lg hover:border-0 md:text-2xl lg:text-3xl"
          >
            logistics@naj.ae
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
