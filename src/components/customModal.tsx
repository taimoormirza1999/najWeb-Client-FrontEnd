import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const CustomModal = ({
  children,
  showOn,
  initialFocus,
  onClose,
  customSize = false,
}) => {
  return (
    <Transition.Root show={showOn} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm "
        initialFocus={initialFocus}
        onClose={onClose}
      >
        <div className="flex min-h-screen items-end justify-center px-2 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {customSize ? (
              children
            ) : (
              <div className="absolute top-1/2 left-1/2 inline-block w-4/5 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border-2 border-solid border-indigo-600 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-lg transition-all sm:p-6 sm:align-middle lg:w-3/5 xl:w-2/5">
                {children}
              </div>
            )}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CustomModal;
