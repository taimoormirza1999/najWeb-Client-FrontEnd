import { useRef, useState } from 'react';

import CustomModal from '@/components/customModal';

const NotesButtonModal = (props) => {
  const { note, title } = props;
  const cancelButtonRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [openNote, setOpenNote] = useState(false);

  return (
    <>
      <CustomModal
        showOn={openNote}
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpenNote(false);
        }}
      >
        <div>
          {/* <h1 className="mt-1 text-2xl font-extrabold first-letter:uppercase dark:text-white">
            {<>{title}</>}
          </h1> */}
          <div className="mb-5 inline-flex items-center rounded-full bg-indigo-100 pl-1 pr-2 text-xl dark:bg-gray-800">
            <span className="mr-2 rounded-full bg-indigo-700 px-6 py-px font-bold text-indigo-100 first-letter:uppercase">
              {title}
            </span>
            <span className="inline px-2 leading-loose text-indigo-800 first-letter:uppercase dark:text-gray-300">
              →
            </span>
          </div>

          <div className="text-dark-blue text-center">
            <p className=" mt-4 text-xl">{note}</p>
          </div>
          <div className="mt-4 mb-3 flex justify-center gap-4">
            <button
              type="button"
              // className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
              className="border-azure-blue text-azure-blue my-1 inline-block max-w-max rounded-full border-2 px-3 py-1 text-base font-medium"
              onClick={() => {
                setOpenNote(false);
                contentRef?.current?.classList.remove('blur-sm');
              }}
              ref={cancelButtonRef}
            >
              Close
            </button>
          </div>
        </div>
      </CustomModal>
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
