import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import CustomModal from '@/components/customModal';

const NoteModal = ({ openNote, note, setOpenNote }) => {
  const cancelButtonRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <CustomModal
      showOn={openNote}
      initialFocus={cancelButtonRef}
      onClose={() => {
        setOpenNote(false);
      }}
    >
      <div className="text-dark-blue text-center sm:mt-16">
        <div className="mt-2">
          <p className="mb-4 py-4 text-sm lg:py-6">{note}</p>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-4 sm:mt-6">
        <button
          type="button"
          className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
          onClick={() => {
            setOpenNote(false);
            contentRef?.current?.classList.remove('blur-sm');
          }}
          ref={cancelButtonRef}
        >
          <FormattedMessage id="general.cancel" />
        </button>
      </div>
    </CustomModal>
  );
};

export default NoteModal;
