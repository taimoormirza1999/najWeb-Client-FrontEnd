import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Breadcrumbs from '@/components/Breadcrumbs';
import ContactDetails from '@/components/ContactDetails';
import CustomModal from '@/components/CustomModal';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';
import { postData } from '@/utils/network';

const NewAccount = () => {
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
    monthly_import: '',
    company_name: '',
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
        monthly_import: '',
        company_name: '',
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
      <div className="container mx-auto" ref={contentRef}>
        <Breadcrumbs
          breadcrumbs={[
            { name: <FormattedMessage id="sign.in" />, href: '#' },
            {
              name: <FormattedMessage id="general.apply_for_account" />,
              href: '/auth/newAccount',
            },
          ]}
        />
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
            <i className="material-icons mb-4 text-6xl text-red-800">
              &#xe160;
            </i>
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
      </div>

      <div className="text-dark-blue container mx-auto py-12" ref={contentRef}>
        <div className="container mx-auto">
          <h2 className="text-center text-5xl font-semibold">
            <FormattedMessage id="general.apply_for_account" />
          </h2>
          <p className="mb-8 py-6 text-2xl">
            <FormattedMessage id="apply_for_account_desc" />
          </p>

          <form onSubmit={handleSubmit} autoComplete="false" method="post">
            <div className="flex w-full flex-col justify-center gap-20 md:flex-row">
              <div className="basis-1/2">
                <div className="flex w-full justify-between gap-2">
                  <label
                    htmlFor="name"
                    className="text-dark-blue block basis-1/4 text-xl font-semibold"
                  >
                    <FormattedMessage id="Name" />
                  </label>
                  <div className="mt-1 basis-3/4">
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
                <div className="my-6 flex w-full justify-between gap-2">
                  <label
                    htmlFor="email"
                    className="text-dark-blue mt-4 block basis-1/4 text-xl font-semibold"
                  >
                    <FormattedMessage id="Email" />
                  </label>
                  <div className="mt-1 basis-3/4">
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
                <div className="my-6 flex w-full justify-between gap-2">
                  <label
                    htmlFor="phone"
                    className="text-dark-blue mt-4 block basis-1/4  text-xl font-semibold"
                  >
                    <FormattedMessage id="Phone" />
                  </label>
                  <div className="mt-1 basis-3/4">
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
                <div>
                  <label className="hidden my-4 text-2xl">
                    <input type="checkbox" className="-mt-1 rounded-sm" />
                    <span className="ml-4">
                      I have read the
                      <Link href="/">
                        <a className="border-azure-blue border-b-2">
                          {' '}
                          terms of services
                        </a>
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
              <div className="basis-1/2">
                <div className="flex w-full justify-between gap-2">
                  <label
                    htmlFor="monthly_import"
                    className="text-dark-blue block basis-1/4 text-xl font-semibold"
                  >
                    <FormattedMessage id="Monthly_Import" />
                  </label>
                  <div className="mt-1 basis-3/4">
                    <input
                      id="monthly_import"
                      name="monthly_import"
                      type="number"
                      required
                      placeholder="No. of cars imported monthly"
                      value={inputValue.monthly_import}
                      onChange={handleChange}
                      className="border-dark-blue placeholder:text-medium-grey block w-full appearance-none rounded border-2 px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
                    />
                  </div>
                </div>
                <div className="my-6 flex w-full justify-between gap-2">
                  <label
                    htmlFor="company_name"
                    className="text-dark-blue mt-4 block basis-1/4 text-xl font-semibold"
                  >
                    <FormattedMessage id="company" />
                  </label>
                  <div className="mt-1 basis-3/4">
                    <input
                      id="company_name"
                      name="company_name"
                      type="text"
                      required
                      placeholder="Company name"
                      value={inputValue.company_name}
                      onChange={handleChange}
                      className="border-dark-blue placeholder:text-medium-grey block w-full appearance-none rounded border-2 px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
                    />
                  </div>
                </div>
                <div className="my-6 flex w-full justify-between gap-2">
                  <label
                    htmlFor="message"
                    className="text-dark-blue mt-4 block basis-1/4 text-xl font-semibold"
                  >
                    <FormattedMessage id="page.customer.dashboard.table.detail" />
                  </label>
                  <div className="mt-1 basis-3/4">
                    <textarea
                      rows={5}
                      className="placeholder:text-medium-grey border-dark-blue w-full resize-none rounded border-2 text-lg placeholder:italic focus:border-blue-800 focus:ring-0"
                      id="message"
                      name="message"
                      placeholder="Any further details about your application"
                      value={inputValue.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
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

      <div className="text-dark-blue container mx-auto pt-8 pb-16">
        <p className="py-4 text-center text-3xl">
          <FormattedMessage id="apply_for_account_desc2" />
        </p>
        <ContactDetails />
      </div>
    </Layout>
  );
};
export default NewAccount;
