import 'react-form-wizard-component/dist/style.css';

import { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { UserContext } from '../userContext';
import { Dialog } from '@headlessui/react';
import CustomModal from '../customModal';

export default function AgencyDocument({}) {
  const [agencyFile, setAgencyFile] = useState(null);
  const intl = useIntl();
  const { profile } = useContext(UserContext);
  const [submitStarted, setSubmitStarted] = useState(false);

  const handleAgencyFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file?.type)) {
      e.target.value = null;
    } else {
      setAgencyFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitStarted(true);

    const formData = new FormData();
    formData.append('customer_id', profile?.customer_id);

    if (agencyFile) {
      formData.append('agencyFile', agencyFile);
    }

    const headers = {
      Accept: '*/*',
      'Accept-Language': 'en-GB,en;q=0.9',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
    };

    try {
      fetch('/api/customer/cars/warehouse_cars/', {
        method: 'POST',
        body: formData,
        cache: 'no-cache',
        headers,
      })
        .then((res) => res.json())
        .then(() => {
          getWarehouseCars();

          emptyCarData();
          setNewCarModalOpen(false);
          setFormSubmitModal({
            status: true,
            type: 'success',
            message: 'Saved successfully.',
          });
        })
        .catch(() => {
          setFormSubmitModal({
            status: true,
            type: 'error',
            message: `Unable to save. Something went wrong.`,
          });
        })
        .finally(() => {
          setSubmitStarted(false);
          document.documentElement.style.overflow = 'auto';
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomModal
      showOn={redirectModalOpen}
      initialFocus={cancelButtonRef}
      onClose={() => {
        setRedirectModalOpen(false);
      }}
    >
      <div className="text-dark-blue mt-6 text-center sm:mt-16">
        <Dialog.Title
          as="h3"
          className="text-xl font-bold leading-6 md:text-2xl lg:text-3xl"
        >
          <FormattedMessage id="form.agency_document" />
        </Dialog.Title>
      </div>
      <div className="mt-5 flex justify-center gap-4 sm:mt-6"></div>
    </CustomModal>
  );
}
