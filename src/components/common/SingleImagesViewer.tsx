import 'react-gallery-carousel/dist/index.css';

import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';

export default function SingleImagesViewer(props) {
  const { src, title } = props;
  const [downloadtype] = useState('');
  const cancelButtonRef = useRef(null);

  const [imagesModalOpen, setImagesModalOpen] = useState(false);

  const ShowImage = () => {
    setImagesModalOpen(true);
  };
  function closeModal() {
    setImagesModalOpen(false);
  }
  return (
    <>
      <Transition appear show={imagesModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="dirltr fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-lg border-2 border-solid border-indigo-600 bg-white text-left align-middle shadow-xl transition-all">
                  {src.length ? (
                    <div className="dirltr p-[12px]">
                      <div className="mb-5 ">
                        <div className="inline-flex items-center rounded-full bg-indigo-100 pl-1 pr-2 text-2xl dark:bg-gray-800 ">
                          {title && (
                            <>
                              <span className="bg-dark-blue mr-2 rounded-full px-6 font-bold text-indigo-100 first-letter:uppercase">
                                {title}
                              </span>
                              <span className="text-dark-blue px-2 leading-loose first-letter:uppercase dark:text-gray-300">
                                Images →
                              </span>
                            </>
                          )}
                        </div>
                        <div
                          className="right-x-button"
                          onClick={() => {
                            setImagesModalOpen(false);
                          }}
                          ref={cancelButtonRef}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </div>
                      </div>
                      <div className="my-[25px]">
                        <img
                          className="h-auto w-full rounded-lg"
                          src={src}
                          alt="image description"
                        />
                      </div>
                      <div className="mt-1 flex justify-center gap-4 sm:mt-2">
                        <button
                          type="button"
                          className="close-button"
                          onClick={() => {
                            setImagesModalOpen(false);
                          }}
                          ref={cancelButtonRef}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="dirltr">
                      <div className="mb-5 inline-flex items-center rounded-full bg-indigo-100 pl-1 pr-2 text-2xl dark:bg-gray-800">
                        <span className="mr-1 rounded-full bg-indigo-700 px-6 py-px font-bold text-indigo-100 first-letter:uppercase">
                          {downloadtype}
                        </span>
                        <span className="inline px-1 leading-loose text-indigo-800 first-letter:uppercase dark:text-gray-300">
                          Images →
                        </span>
                      </div>
                      <h1 className=" text-center text-2xl font-extrabold first-letter:uppercase dark:text-white">
                        <FontAwesomeIcon icon={faImage} /> Sorry! No images
                        found in {downloadtype}.
                      </h1>
                      <div className="mt-1 flex justify-center gap-4 sm:mt-2">
                        <button
                          type="button"
                          className="close-button"
                          onClick={() => {
                            setImagesModalOpen(false);
                          }}
                          ref={cancelButtonRef}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>{' '}
      {
        <img
          className="table_auction_img table_auction_img"
          src={src}
          alt=""
          onClick={() => {
            ShowImage();
          }}
        />
      }
    </>
  );
}
