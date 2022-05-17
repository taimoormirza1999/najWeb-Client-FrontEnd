import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactDetails from '@/components/ContactDetails';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';
import { postData } from '@/utils/network';
import CustomModal from '@/components/CustomModal';
import { Dialog } from '@headlessui/react';
import { FormattedMessage } from 'react-intl';

const Contact = () => {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const okButtonRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const okButtonErrorRef = useRef(null);
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      message: event.target.message.value,
    };

    const response = await postData('/api/contactus', formData);

    if (response.success === true) {
      setSubmitModalOpen(true);
      contentRef?.current?.classList.add('blur-sm');
      setInputValue(() => ({
        name: '',
        email: '',
        phone: '',
        message: '',
      }));
    } else {
      setErrorModalOpen(true);
      contentRef?.current?.classList.add('blur-sm');
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <Layout meta={<Meta title="Contact Us" description="Contact Us" />}>
      <CustomModal
        showOn={submitModalOpen}
        initialFocus={okButtonRef}
        onClose={() => {
          setSubmitModalOpen(false);
          contentRef?.current?.classList.remove('blur-sm');
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons text-yellow-orange mb-4 text-6xl">
            &#xe2e6;
          </i>
          <Dialog.Title as="h3" className="text-3xl font-bold leading-6">
            Your Message was Sent!
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-xl">
              We’ve received your request in our customers services offices.{' '}
              <br /> We’ll get back to you as soon as possible.
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setSubmitModalOpen(false);
              contentRef?.current?.classList.remove('blur-sm');
            }}
            ref={okButtonRef}
          >
            Okay
          </button>
        </div>
      </CustomModal>
      <CustomModal
        showOn={errorModalOpen}
        initialFocus={okButtonErrorRef}
        onClose={() => {
          setErrorModalOpen(false);
          contentRef?.current?.classList.remove('blur-sm');
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons mb-4 text-6xl text-red-800">&#xe160;</i>
          <Dialog.Title as="h3" className="text-4xl font-bold leading-6">
            Sorry!
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-2xl">
              A technical Error has occurred. Please Try again
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setErrorModalOpen(false);
              contentRef?.current?.classList.remove('blur-sm');
            }}
            ref={okButtonErrorRef}
          >
            Okay
          </button>
        </div>
      </CustomModal>
      <div className="container mx-auto" ref={contentRef}>
        <Breadcrumbs breadcrumbs={[{ name: 'Contact Us', href: '/contact' }]} />
      </div>

      <div className="bg-light-grey text-dark-blue py-12" ref={contentRef}>
        <div className="container mx-auto">
          <h2 className="text-center text-5xl font-semibold">
            <FormattedMessage id="Stay in Touch" />
          </h2>
          <p className="py-4 text-center text-2xl">
            <FormattedMessage id="Stay in Touch Desc" />
          </p>

          <form onSubmit={handleSubmit} autoComplete="false" method="post">
            <div className="flex w-full flex-col justify-center gap-8 md:flex-row">
              <div className="basis-2/6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-dark-blue block text-xl font-semibold"
                  >
                    <FormattedMessage id="Name" />
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={inputValue.name}
                      onChange={handleChange}
                      className="border-dark-blue placeholder:text-medium-grey block w-full appearance-none rounded border-2 px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-dark-blue mt-4 block text-xl font-semibold"
                  >
                    <FormattedMessage id="Email" />
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Your email"
                      value={inputValue.email}
                      onChange={handleChange}
                      className="border-dark-blue placeholder:text-medium-grey block w-full appearance-none rounded border-2 px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-dark-blue mt-4 block text-xl font-semibold"
                  >
                    <FormattedMessage id="Phone" />
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      required
                      placeholder="Your phone"
                      value={inputValue.phone}
                      onChange={handleChange}
                      className="border-dark-blue placeholder:text-medium-grey block w-full appearance-none rounded border-2 px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
                    />
                  </div>
                </div>
              </div>
              <div className="basis-2/6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-dark-blue block text-xl font-semibold"
                  >
                    <FormattedMessage id="Message" />
                  </label>
                </div>
                <div className="mt-1">
                  <textarea
                    rows={9}
                    className="placeholder:text-medium-grey border-dark-blue w-full resize-none rounded border-2 text-lg placeholder:italic focus:border-blue-800 focus:ring-0"
                    name="message"
                    placeholder="Write something here..."
                    value={inputValue.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="border-azure-blue bg-azure-blue hover:bg-dark-blue mx-auto my-6 flex justify-center rounded border-2 py-[6px] px-6 text-lg font-semibold text-white shadow-sm"
            >
              <FormattedMessage id="Submit" />
            </button>
          </form>
        </div>
      </div>

      <div className="text-dark-blue container mx-auto py-8">
        <h2 className="text-center text-5xl font-semibold">
          <FormattedMessage id="Visit Us" />
        </h2>
        <p className="mb-8 py-4 text-center text-2xl">
          <FormattedMessage id="Visit Us Desc" />
        </p>
        <div className="mx-auto flex w-4/5 gap-8">
          <div className="basis-2/5">
            <div className="border-dark-blue rounded-xl border p-4">
              <div
                className="border-dark-blue text-dark-blue bg-light-grey rounded-xl border p-4 text-3xl"
                id="address_text"
              >
                <FormattedMessage id="NEJOUM ALJAZEERA Group Industrial area 4, Sharjah, UAE" />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    const copyText =
                      document.getElementById('address_text')?.innerText || '';
                    navigator.clipboard.writeText(copyText);
                  }}
                >
                  <i className="material-icons text-azure-blue text-5xl">
                    &#xe14d;
                  </i>
                </button>
                <a
                  href="https://goo.gl/maps/G8PoFYf8qts9RgEaA"
                  target="_blank"
                  className="hover:border-0"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faExternalLink}
                    className="bg-azure-blue rounded-md py-2 px-3 text-3xl text-white"
                  />
                </a>
              </div>
            </div>

            <p className="text-dark-blue pt-16 text-3xl">
              <FormattedMessage id="Copy upper location using the copy button, press the new link button get directions in Google Maps." />
            </p>
          </div>
          <div className="border-azure-blue basis-3/5 overflow-hidden rounded-xl border">
            <iframe
              className="w-full"
              height="500"
              src="https://maps.google.com/maps?q=Nejoum%20Al%20Jazeera%20Used%20Cars%20&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="text-dark-blue container mx-auto py-8">
        <h2 className="text-center text-5xl font-semibold">
          {' '}
          <FormattedMessage id="Contact Us" />{' '}
        </h2>
        <p className="py-4 text-center text-2xl">
          <FormattedMessage id="Contact Us Desc" />
        </p>
        <ContactDetails />
      </div>

      <div className="container mx-auto py-16">
        <h3 className="text-center !text-5xl font-semibold">
          <FormattedMessage id="Contact Us" />
        </h3>
        <img
          className="relative -z-10 mx-auto max-w-[75%] rounded-t-[40px]"
          src="/assets/images/contact-us.jpg"
          alt="Contact Us"
        />
        <div className="bg-light-grey mx-auto -mt-16 max-w-[75%] rounded-b-[40px] p-8 text-center">
          <p className="text-dark-blue py-3 text-3xl">
            <FormattedMessage id="WhatsApp" />
          </p>
          <a
            href="https://wa.me/+971543662194?text=welcome to Nejoum aljazeera"
            target="_blank"
            rel="noreferrer"
            className="bg-azure-blue my-4 inline-block rounded-lg px-5 py-2.5 text-xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Text Nejoum
          </a>
        </div>
      </div>

      <div className="text-dark-blue container mx-auto py-8">
        <h2 className="text-center text-5xl font-semibold">
          <FormattedMessage id="Working Times" />
        </h2>
        <p className="py-4 text-center text-3xl">
          <FormattedMessage id="Our working hours are the following" />
        </p>

        <div className="border-azure-blue mx-auto mb-12 w-3/4 overflow-hidden rounded-xl border">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-light-grey">
                <th className="border border-t-0 border-l-0 border-r-gray-500 border-b-gray-500 p-4 text-2xl font-semibold">
                  <FormattedMessage id="Weekdays" />
                </th>
                <th className="border border-t-0 border-r-0 border-b-gray-500 p-4 text-2xl font-semibold">
                  <FormattedMessage id="Time" />
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="border border-t-0 border-l-0 border-r-gray-500 border-b-gray-500 py-4 text-xl">
                  <FormattedMessage id="Saturday - Thursday" />
                </td>
                <td className="border border-t-0 border-r-0 border-b-gray-500 py-4 text-xl">
                  <FormattedMessage id="08:30 am - 01:00 pm / 04:00 pm - 08:30 pm" />
                </td>
              </tr>
              <tr>
                <td className="border border-y-0 border-l-0 border-r-gray-500 py-4 text-xl">
                  <FormattedMessage id="Friday" />
                </td>
                <td className="border border-y-0 border-r-0 border-l-gray-500 py-4 text-xl">
                  <FormattedMessage id="N/A" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
