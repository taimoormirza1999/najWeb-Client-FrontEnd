const ContactDetails = () => {
  return (
    <div className="text-dark-blue container mx-auto py-8">
      <div className="mx-auto flex w-3/4 justify-between">
        <div>
          <h3 className="text-dark-blue py-4 text-5xl font-semibold">Phone</h3>
          <h4 className="text-dark-blue py-3 text-3xl font-semibold">
            Main
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <a
            href="tel:+971 65 440 202"
            className="text-azure-blue text-3xl hover:border-0"
          >
            +971 65 440 202
          </a>
          <h4 className="text-dark-blue mt-6 py-3 text-3xl font-semibold">
            Customer Service
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <a
            href="tel:+971 65 440 202"
            className="text-azure-blue text-3xl hover:border-0"
          >
            +971 58 931 1465
          </a>
          <h4 className="text-dark-blue mt-6 py-3 text-3xl font-semibold">
            Logistics Services
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <a
            href="tel:+971 65 440 202"
            className="text-azure-blue text-3xl hover:border-0"
          >
            +971 58 931 1461
          </a>
        </div>
        <div>
          <h3 className="text-dark-blue py-4 text-5xl font-semibold">Email</h3>
          <h4 className="text-dark-blue py-3 text-3xl font-semibold">
            Main
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <a
            href="mailto:support@naj.ae"
            className="text-azure-blue text-3xl hover:border-0"
          >
            info@naj.ae
          </a>
          <h4 className="text-dark-blue mt-6 py-3 text-3xl font-semibold">
            Customer Service
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <a
            href="mailto:support@naj.ae"
            className="text-azure-blue text-3xl hover:border-0"
          >
            support@naj.ae
          </a>
          <h4 className="text-dark-blue mt-6 py-3 text-3xl font-semibold">
            Logistics Services
            <div className="border-yellow-orange w-10 border"></div>
          </h4>
          <a
            href="mailto:support@naj.ae"
            className="text-azure-blue text-3xl hover:border-0"
          >
            logistics@naj.ae
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
