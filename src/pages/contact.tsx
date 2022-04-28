import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Breadcrumbs from '@/components/Breadcrumbs';
import ContactDetails from '@/components/ContactDetails';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

const Contact = () => (
  <Layout meta={<Meta title="Contact Us" description="Contact Us" />}>
    <div className="container mx-auto">
      <Breadcrumbs breadcrumbs={[{ name: 'Contact Us', href: '/contact' }]} />
    </div>

    <div className="bg-light-grey text-dark-blue py-12">
      <div className="container mx-auto">
        <h2 className="text-center text-5xl font-semibold">Stay in Touch!</h2>
        <p className="py-4 text-center text-2xl">
          <span className="font-bold">Got any questions?</span> We are always
          happy to help! Do not hesitate to call us or Fill up the form below.{' '}
          <br />
          We try to get back as soon as possible.
        </p>

        <form method="post" action="" autoComplete="false">
          <div className="flex w-full flex-col justify-center gap-8 md:flex-row">
            <div className="basis-2/6">
              <div>
                <label
                  htmlFor="name"
                  className="text-dark-blue block text-xl font-semibold"
                >
                  Name
                </label>
                <div className="mt-1">
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
              <div>
                <label
                  htmlFor="email"
                  className="text-dark-blue mt-4 block text-xl font-semibold"
                >
                  Email
                </label>
                <div className="mt-1">
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
              <div>
                <label
                  htmlFor="phone"
                  className="text-dark-blue mt-4 block text-xl font-semibold"
                >
                  Phone
                </label>
                <div className="mt-1">
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
            </div>
            <div className="basis-2/6">
              <div>
                <label
                  htmlFor="name"
                  className="text-dark-blue block text-xl font-semibold"
                >
                  Message
                </label>
              </div>
              <div className="mt-1">
                <textarea
                  rows={9}
                  className="placeholder:text-medium-grey border-dark-blue w-full resize-none rounded border-2 text-lg placeholder:italic focus:border-blue-800 focus:ring-0"
                  name="message"
                  placeholder="Write something here..."
                ></textarea>
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

    <div className="text-dark-blue container mx-auto py-8">
      <h2 className="text-center text-5xl font-semibold">Visit Us</h2>
      <p className="mb-8 py-4 text-center text-2xl">
        You May copy the Address Below and paste in Google Maps to get the your
        directions
      </p>
      <div className="mx-auto flex w-4/5 gap-8">
        <div className="basis-2/5">
          <div className="border-dark-blue rounded-xl border p-4">
            <div
              className="border-dark-blue text-dark-blue bg-light-grey rounded-xl border p-4 text-3xl"
              id="address_text"
            >
              <span className="font-bold">NEJOUM </span>
              ALJAZEERA Group Industrial area 4, Sharjah, UAE
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
            Copy upper location using the <span className="italic">copy </span>
            button, press the new link button get directions in Google Maps.
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
      <h2 className="text-center text-5xl font-semibold">Contact Us</h2>
      <p className="py-4 text-center text-3xl">
        You’re Welcome to call, text or email us on the following details
      </p>
      <ContactDetails />
    </div>

    <div className="container mx-auto py-16">
      <h3 className="block-heading text-center !text-6xl">Contact Us</h3>
      <img
        className="relative -z-10 mx-auto max-w-[80%] pt-8"
        src="/assets/images/contact-us.jpg"
        alt="Contact Us"
      />
      <div className="bg-light-grey mx-auto -mt-16 max-w-[80%] rounded-b-[60px] p-8 text-center">
        <p className="block-text !max-w-none">
          You may always text us on WhatsApp
        </p>
        <a
          href="https://wa.me/+97165440202?text=Hi"
          target="_blank"
          rel="noreferrer"
          className="bg-azure-blue my-4 inline-block rounded-lg px-5 py-2.5 text-xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Text Nejoum
        </a>
      </div>
    </div>

    <div className="text-dark-blue container mx-auto py-8">
      <h2 className="text-center text-5xl font-semibold">Working Times</h2>
      <p className="py-4 text-center text-3xl">
        Our working hours are the following
      </p>

      <div className="border-azure-blue mx-auto mb-12 w-3/4 overflow-hidden rounded-xl border">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-light-grey">
              <th className="border border-t-0 border-l-0 border-r-gray-500 border-b-gray-500 p-4 text-2xl font-semibold">
                Weekdays
              </th>
              <th className="border border-t-0 border-r-0 border-b-gray-500 p-4 text-2xl font-semibold">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="border border-t-0 border-l-0 border-r-gray-500 border-b-gray-500 py-4 text-xl">
                Saturday - Thursday
              </td>
              <td className="border border-t-0 border-r-0 border-b-gray-500 py-4 text-xl">
                08:30 am - 01:00 pm / 04:00 pm - 08:30 pm
              </td>
            </tr>
            <tr>
              <td className="border border-y-0 border-l-0 border-r-gray-500 py-4 text-xl">
                Friday
              </td>
              <td className="border border-y-0 border-r-0 border-l-gray-500 py-4 text-xl">
                N/A
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
);

export default Contact;
