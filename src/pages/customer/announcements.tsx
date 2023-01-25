import { Dialog } from '@headlessui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import CustomModal from '@/components/customModal';
import { SearchLot } from '@/components/dashboard/searchLot';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';

const apiUrl = process.env.API_URL;
export interface Announcement {
  title_english: string;
  title_arabic: string;
  body_english: string;
  body_arabic: string;
  announcement_type: string;
  file_path: string;
}
const Announcements = ({ announcements }) => {
  const [anouncementModalOpen, setAnouncementModalOpen] = useState(false);
  const closeAnouncementButtonRef = useRef(null);
  const [anouncementDetail, setAnouncementDetail] = useState<Announcement>({
    title_english: '',
    title_arabic: '',
    body_english: '',
    body_arabic: '',
    announcement_type: '',
    file_path: '',
  });
  const router = useRouter();
  const { locale } = router;
  return (
    <Layout meta={<Meta title="Announcements" description="" />}>
      <CustomModal
        showOn={anouncementModalOpen}
        initialFocus={closeAnouncementButtonRef}
        onClose={() => {
          setAnouncementModalOpen(false);
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <Dialog.Title
            as="h3"
            className="text-xl font-bold leading-6 md:text-2xl lg:text-3xl"
          >
            {anouncementDetail.title_english}
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-4 text-lg md:text-xl lg:py-6 lg:text-2xl">
              {anouncementDetail.body_english}
            </p>
            {anouncementDetail.file_path != null ? (
              <Link
                href={
                  process.env.NEXT_PUBLIC_SERVER_URL +
                  anouncementDetail.file_path.substring(1)
                }
                passHref
              >
                <a
                  target="_blank"
                  className="cursor-pointer text-xl font-bold italic"
                >
                  (View attached files)
                </a>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
            onClick={() => {
              setAnouncementModalOpen(false);
            }}
            ref={closeAnouncementButtonRef}
          >
            Close
          </button>
        </div>
      </CustomModal>
      <div className="m-4">
        <div className="flex">
          <h4 className="text-dark-blue flex-1 text-xl font-semibold sm:text-4xl">
            <i className="material-icons text-yellow-orange align-middle text-4xl">
              &#xef49;
            </i>
            <span className="pl-1 align-middle">
              <FormattedMessage id="page.customer.dashboard.announcements" />
            </span>
          </h4>
          <SearchLot></SearchLot>
        </div>
      </div>
      <div className="mx-auto px-8">
        <div>
          <div className="mx-auto mt-12 grid max-w-lg gap-7 text-center lg:max-w-none lg:grid-cols-1">
            {announcements.length > 0 ? (
              announcements.map((row, index) => (
                <div
                  key={index}
                  className="flex flex-col border-2 border-[#e5e7eb] py-4"
                >
                  <h3 className="text-dark-blue text-2xl font-semibold">
                    {locale === 'ar' ? row.title_arabic : row.title_english}
                  </h3>
                  <p className="text-dark-blue text-xl">
                    {locale === 'ar'
                      ? `${row.body_arabic.substring(0, 200)} ...`
                      : `${row.body_english.substring(0, 220)} ...`}
                    {row.announcement_type === '1' && (
                      <span
                        className="ml-2 cursor-pointer text-lg font-semibold italic"
                        onClick={() => {
                          setAnouncementDetail(row);
                          setAnouncementModalOpen(true);
                        }}
                      >
                        (<FormattedMessage id="read.more" />)
                      </span>
                    )}
                    {row.announcement_type === '3' && (
                      <Link
                        href={
                          process.env.NEXT_PUBLIC_SERVER_URL +
                          row.file_path.substring(1)
                        }
                        passHref
                      >
                        <a
                          target="_blank"
                          className="ml-2 cursor-pointer text-lg font-semibold italic"
                        >
                          (<FormattedMessage id="read.more" />)
                        </a>
                      </Link>
                    )}
                    {row.announcement_type === '2' && (
                      <a
                        target="_blank"
                        href={
                          process.env.NEXT_PUBLIC_SERVER_URL +
                          row.file_path.substring(1)
                        }
                        rel="noopener noreferrer"
                      >
                        <img
                          src={
                            process.env.NEXT_PUBLIC_SERVER_URL +
                            row.file_path.substring(1)
                          }
                          alt=""
                          className="mx-auto max-h-[300px]"
                        />
                      </a>
                    )}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-azure-blue text-lg font-bold">
                <FormattedMessage id="No_announcement_is_available" />
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(`${apiUrl}adsAnnouncement`);
  const announcements = res.data;

  return {
    props: {
      announcements,
    },
  };
}

export default Announcements;
