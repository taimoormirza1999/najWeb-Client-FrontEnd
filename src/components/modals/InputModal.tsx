import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

interface InputModalProps {
  title: string;
  extraInfo?: string;
  buttonTitle: string;
  onSubmit: (value: string) => void;
}

const InputModal: React.FC<InputModalProps> = (props) => {
  const { title, onSubmit, buttonTitle,extraInfo="" } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function closeModal() {
    setIsOpen(false);
    // clear input value
    setInputValue('');
  }

  function handleSubmit() {
    onSubmit(inputValue);
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
                    <p className="float-left ml-[12px]">
                      <FormattedMessage id={title}></FormattedMessage> {extraInfo}
                    </p>
                    <div
                      className="float-right mr-[14px] cursor-pointer text-[18px] font-bold text-[red]"
                      onClick={closeModal}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-3">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="mt-2 w-full rounded border p-2"
                    />

                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-1 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          contentRef?.current?.classList.add('blur-sm');
        }}
        className="text-xxs m-2  inline-flex rounded-md border border-transparent bg-indigo-600 px-2 py-0.5 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap"

      >
         <FormattedMessage id={buttonTitle} />
      </button>
    </>
  );
};

export default InputModal;
