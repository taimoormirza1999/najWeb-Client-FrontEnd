import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';

const NotesButtonModal = (props) => {
  const { note, title } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const [openNote, setOpenNote] = useState(false);
  function closeModal() {
    setOpenNote(false);
  }

  return (
    <>
      <Transition appear show={openNote} as={Fragment}>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="flow-root w-[100%] bg-[#cbd5e1] py-[1px]">
                    <p className="float-left ml-[12px]">{title}</p>
                    <p
                      className="float-right mr-[14px] cursor-pointer text-[18px] font-bold text-[red]"
                      onClick={closeModal}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </p>
                  </div>
                  <div className="px-5 pb-5 pt-3">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-500"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-xl text-gray-900">{note}</p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Got it, Close!
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {!props.note || props.note === '-' ? (
        <span>N A</span>
      ) : (
        <button
          type="button"
          onClick={() => {
            // setNote(notes);
            setOpenNote(true);
            contentRef?.current?.classList.add('blur-sm');
          }}
          className="inline-flex rounded border border-transparent bg-indigo-600 p-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Notes
        </button>
      )}
    </>
  );
};

export default NotesButtonModal;
