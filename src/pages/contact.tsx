import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Breadcrumbs from '@/components/breadcrumbs';
import ContactDetails from '@/components/contactDetails';
import CustomModal from '@/components/customModal';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';
import { postData } from '@/utils/network';

const Contact = () => {
  const intl = useIntl();
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const okButtonRef = useRef(null);
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
      setInputValue(() => ({
        name: '',
        email: '',
        phone: '',
        message: '',
      }));
    } else {
      setErrorModalOpen(true);
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
            }}
            ref={okButtonErrorRef}
          >
            Okay
          </button>
        </div>
      </CustomModal>
      <Breadcrumbs
        breadcrumbs={[
          {
            name: <FormattedMessage id="general.contact" />,
            href: '/contact',
          },
        ]}
      />

      <div className="bg-light-grey text-dark-blue py-12">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-semibold lg:text-5xl">
            <FormattedMessage id="Stay.in.Touch" />
          </h2>
          <p className="py-4 text-center text-xl lg:text-2xl">
            <FormattedMessage id="Stay.in.Touch.Desc" />
          </p>

          <form onSubmit={handleSubmit} autoComplete="false" method="post">
            <div className="flex w-full flex-col justify-center lg:flex-row lg:gap-8">
              <div className="basis-1/2">
                <div className="mx-4">
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
                      placeholder={intl.formatMessage({ id: 'Your.name' })}
                      value={inputValue.name}
                      onChange={handleChange}
                      className="border-dark-blue placeholder:text-medium-grey mb-4 block w-full appearance-none rounded border-1 px-3 py-2 text-lg shadow-sm  focus:border-blue-800 focus:ring-0"
                    />
                  </div>
                </div>
                <div className="mx-4">
                  <label
                    htmlFor="email"
                    className="text-dark-blue mb-4 block text-xl font-semibold"
                  >
                    <FormattedMessage id="Email" />
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={intl.formatMessage({ id: 'Your.email' })}
                      value={inputValue.email}
                      onChange={handleChange}
                      className="border-dark-blue placeholder:text-medium-grey mb-4 block w-full appearance-none rounded border-1 px-3 py-2 text-lg shadow-sm  focus:border-blue-800 focus:ring-0"
                    />
                  </div>
                </div>
                <div className="mx-4">
                  <label
                    htmlFor="phone"
                    className="text-dark-blue block text-xl font-semibold"
                  >
                    <FormattedMessage id="Phone" />
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      required
                      placeholder={intl.formatMessage({ id: 'Your.phone' })}
                      value={inputValue.phone}
                      onChange={handleChange}
                      className="border-dark-blue placeholder:text-medium-grey mb-4 block w-full appearance-none rounded border-1 px-3 py-2 text-lg shadow-sm  focus:border-blue-800 focus:ring-0"
                    />
                  </div>
                </div>
              </div>
              <div className="basis-1/2">
                <div className="mx-4">
                  <label
                    htmlFor="name"
                    className="text-dark-blue block text-xl font-semibold"
                  >
                    <FormattedMessage id="Message" />
                  </label>
                </div>
                <div className="mt-1">
                  <textarea
                    className="placeholder:text-medium-grey border-dark-blue h-[245px] w-full resize-none rounded border-1 text-lg  focus:border-blue-800 focus:ring-0"
                    name="message"
                    required
                    placeholder={intl.formatMessage({ id: 'messages.message' })}
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
              <FormattedMessage id="general.submit" />
            </button>
          </form>
        </div>
      </div>

      <div className="text-dark-blue container mx-auto py-8">
        <h2 className="text-center text-3xl font-semibold lg:text-5xl">
          <FormattedMessage id="Visit.Us" />
        </h2>
        <p className="mb-8 py-4 text-center text-xl lg:text-2xl">
          <FormattedMessage id="Visit.Us.Desc" />
        </p>
        <div className="mx-auto flex flex-col gap-8 lg:w-4/5 lg:flex-row">
          <div className="basis-[45%]">
            <div className="border-dark-blue rounded-xl border p-4">
              <div
                className="border-dark-blue text-dark-blue bg-light-grey rounded-xl border p-4 pb-8 text-xl lg:text-3xl"
                id="address_text"
              >
                <span className="font-sen">
                  <span className="font-bold">
                    <FormattedMessage id="page.company.name.nejoum" />
                  </span>
                  <FormattedMessage id="page.company.name.aljazeera" />
                </span>
                <FormattedMessage id="NEJOUM.ALJAZEERA.Group.Industrial.area4.Sharjah.UAE" />
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
                  <i className="material-icons text-azure-blue text-4xl lg:text-5xl hover:text-gray-700">
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
                    className="bg-azure-blue rounded-md py-2 px-3 text-xl text-white hover:text-gray-700 lg:text-3xl"
                  />
                </a>
              </div>
            </div>

            <p className="text-dark-blue pt-12 text-2xl lg:pt-20">
              <FormattedMessage id="Copy.upper.location.using.the.copy.button.press.the.new.link.button.get.directions.in.Google.Maps." />
            </p>
          </div>
          <div className="border-azure-blue basis-[55%] overflow-hidden rounded-xl border-2">
            <iframe
              className="w-full"
              height="450"
              src="https://maps.google.com/maps?q=Nejoum%20Al%20Jazeera%20Used%20Cars%20&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="text-dark-blue container mx-auto mt-12">
        <h2 className="text-center text-3xl font-semibold lg:text-5xl">
          {' '}
          <FormattedMessage id="general.contact" />{' '}
        </h2>
        <p className="py-4 text-center text-xl lg:text-2xl">
          <FormattedMessage id="Contact.Us.Desc" />
        </p>
        <ContactDetails />
      </div>

      <div className="container mx-auto py-16">
        <img
          className="relative -z-10 mx-auto rounded-t-[40px] object-cover lg:max-w-[75%]"
          src="/assets/images/contact-service.png"
          alt="Contact Us"
        />
        <div className="bg-light-grey mx-auto -mt-16 rounded-b-[40px] p-2 text-center lg:max-w-[75%] lg:p-8">
          <p className="text-dark-blue py-3 text-xl lg:text-3xl">
            <FormattedMessage id="WhatsApp" />
          </p>
          <a
            href="https://wa.me/+97165440202?text=welcome to Nejoum aljazeera"
            target="_blank"
            rel="noreferrer"
            className="bg-azure-blue my-2 inline-block rounded-lg px-5 py-2 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:text-xl"
          >
            <FormattedMessage id="general.text_nejoum" />
          </a>
        </div>
      </div>

      <div className="text-dark-blue container mx-auto py-8">
        <h2 className="text-center text-3xl font-semibold lg:text-5xl">
          <FormattedMessage id="Working_Times" />
        </h2>
        <p className="py-4 text-center text-xl lg:text-2xl">
          <FormattedMessage id="Our_working_hours_are_the_following" />
        </p>

        <div className="border-azure-blue mx-auto mb-12 overflow-hidden rounded-xl border lg:w-3/4">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-light-grey">
                <th className="border border-t-0 border-l-0 border-r-gray-500 border-b-gray-500 p-4 text-xl font-semibold lg:text-2xl">
                  <FormattedMessage id="Weekdays" />
                </th>
                <th className="border border-t-0 border-r-0 border-b-gray-500 p-4 text-xl font-semibold lg:text-2xl">
                  <FormattedMessage id="Time" />
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="border border-t-0 border-l-0 border-r-gray-500 border-b-gray-500 py-4 text-base lg:text-xl">
                  <FormattedMessage id="Saturday-Thursday" />
                </td>
                <td className="border border-t-0 border-r-0 border-b-gray-500 py-4 text-base lg:text-xl">
                  08:30am-01:00pm/04:00pm-08:30pm
                </td>
              </tr>
              <tr>
                <td className="border border-y-0 border-l-0 border-r-gray-500 py-4 text-base lg:text-xl">
                  <FormattedMessage id="Friday" />
                </td>
                <td className="border border-y-0 border-r-0 border-l-gray-500 py-4 text-base lg:text-xl">
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
