import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import ContactDetails from '@/components/ContactDetails';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

const NewAccount = () => (
  <Layout meta={<Meta title="Contact Us" description="Contact Us" />}>
    <div className="container mx-auto">
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Sign In', href: '#' },
          { name: 'Apply For Account', href: '/auth/newAccount' },
        ]}
      />
    </div>

    <div className="text-dark-blue container mx-auto py-12">
      <div className="container mx-auto">
        <h2 className="text-center text-5xl font-semibold">
          Apply for Account
        </h2>
        <p className="py-4 align-middle text-4xl">
          <i className="material-icons text-yellow-orange mr-2 align-middle text-4xl">
            &#xe853;
          </i>
          <span className="font-bold">NAJ Account</span> Form
        </p>
        <p className="mb-8 py-6 text-2xl">
          We’re determined at <span className="font-sen font-bold">NEJOUM</span>{' '}
          ALJAZEERA to provide you the means of convenience to receive our you
          business needs as soon as possible. Please fill up the form below to
          apply for NAJ Account
        </p>

        <form method="post" action="" autoComplete="false">
          <div className="flex w-full flex-col justify-center gap-20 md:flex-row">
            <div className="basis-1/2">
              <div className="flex w-full justify-between gap-2">
                <label
                  htmlFor="name"
                  className="text-dark-blue block basis-1/4 text-xl font-semibold"
                >
                  Name
                </label>
                <div className="mt-1 basis-3/4">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="border-dark-blue placeholder:text-medium-grey block w-full appearance-none rounded border-2 px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
                  />
                </div>
              </div>
              <div className="my-6 flex w-full justify-between gap-2">
                <label
                  htmlFor="email"
                  className="text-dark-blue mt-4 block basis-1/4 text-xl font-semibold"
                >
                  Email Address
                </label>
                <div className="mt-1 basis-3/4">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Your email"
                    className="border-dark-blue placeholder:text-medium-grey block w-full appearance-none rounded border-2 px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
                  />
                </div>
              </div>
              <div className="my-6 flex w-full justify-between gap-2">
                <label
                  htmlFor="phone"
                  className="text-dark-blue mt-4 block basis-1/4  text-xl font-semibold"
                >
                  Phone No.
                </label>
                <div className="mt-1 basis-3/4">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    placeholder="Your phone"
                    className="border-dark-blue placeholder:text-medium-grey block w-full appearance-none rounded border-2 px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
                  />
                </div>
              </div>
              <div>
                <label className="my-4 text-2xl">
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
                  Monthly Import
                </label>
                <div className="mt-1 basis-3/4">
                  <input
                    id="monthly_import"
                    name="monthly_import"
                    type="number"
                    required
                    placeholder="No. of cars imported monthly"
                    className="border-dark-blue placeholder:text-medium-grey block w-full appearance-none rounded border-2 px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
                  />
                </div>
              </div>
              <div className="my-6 flex w-full justify-between gap-2">
                <label
                  htmlFor="company_name"
                  className="text-dark-blue mt-4 block basis-1/4 text-xl font-semibold"
                >
                  Company
                </label>
                <div className="mt-1 basis-3/4">
                  <input
                    id="company_name"
                    name="company_name"
                    type="text"
                    required
                    placeholder="Company name"
                    className="border-dark-blue placeholder:text-medium-grey block w-full appearance-none rounded border-2 px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
                  />
                </div>
              </div>
              <div className="my-6 flex w-full justify-between gap-2">
                <label
                  htmlFor="details"
                  className="text-dark-blue mt-4 block basis-1/4 text-xl font-semibold"
                >
                  Details
                </label>
                <div className="mt-1 basis-3/4">
                  <textarea
                    rows={5}
                    className="placeholder:text-medium-grey border-dark-blue w-full resize-none rounded border-2 text-lg placeholder:italic focus:border-blue-800 focus:ring-0"
                    id="details"
                    name="details"
                    placeholder="Any further details about your application"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="border-azure-blue bg-azure-blue hover:bg-dark-blue mx-auto my-6 flex justify-center rounded border-2 py-[6px] px-6 text-lg font-semibold text-white shadow-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    <div className="text-dark-blue container mx-auto pt-8 pb-16">
      <p className="py-4 text-center text-3xl">
        You may contact our Customer Service to Apply for Account on the
        Following Details
      </p>
      <ContactDetails />
    </div>
  </Layout>
);

export default NewAccount;
