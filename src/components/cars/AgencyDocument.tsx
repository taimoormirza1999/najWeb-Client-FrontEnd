import 'react-form-wizard-component/dist/style.css';

import { InformationCircleIcon } from '@heroicons/react/outline';
import { useContext, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import CustomModal from '../customModal';
import { SpinnerIcon } from '../themeIcons';
import { UserContext } from '../userContext';

export default function AgencyDocument({
  agencyModalOpen,
  setAgencyModalOpen,
  setFormSubmitModal,
}) {
  const [agencyFile, setAgencyFile] = useState(null);
  const intl = useIntl();
  const { profile } = useContext(UserContext);
  const [submitStarted, setSubmitStarted] = useState(false);
  const closeModalRef = useRef(null);
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string | undefined;
  }>({});

  const handleAgencyFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file?.type)) {
      e.target.value = null;
      setFormErrors((prev) => ({
        ...prev,
        agency_file: intl.formatMessage({ id: 'form.validaton.only_pdf' }),
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        agency_file: '',
      }));
      setAgencyFile(e.target.files[0]);
    }
  };

  const getValidationMessage = (fieldName) => {
    return (
      formErrors[fieldName] && (
        <p className="text-sm text-red-600">{formErrors[fieldName]}</p>
      )
    );
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
      fetch('/api/customer/cars/agencyDocument/', {
        method: 'POST',
        body: formData,
        cache: 'no-cache',
        headers,
      })
        .then((res) => res.json())
        .then(() => {
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
          setAgencyModalOpen(false);
          document.documentElement.style.overflow = 'auto';
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomModal
      showOn={agencyModalOpen}
      initialFocus={closeModalRef}
      onClose={() => {
        document.documentElement.style.overflow = 'auto';
      }}
    >
      <div className="mt-3 flex w-full gap-4">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
          className="max-h-[90vh] overflow-y-auto px-2"
        >
          <div className="my-4 gap-2 sm:flex">
            <div className="w-full">
              <label className="text-teal-blue block text-lg rtl:text-right">
                <FormattedMessage id="form.agency_document" />
                <span className="mx-1 text-lg text-red-500">*</span>
              </label>
              <input
                className="my-2 w-full rounded-md border py-1 text-lg text-gray-700 focus:outline-none"
                type="file"
                name="agency_file"
                accept="application/pdf"
                required={true}
                onChange={handleAgencyFileChange}
              />
              {getValidationMessage('agency_file')}
              <p className="text-dark-blue my-2 flex gap-1 text-sm">
                <InformationCircleIcon className="h-5 w-5" />
                <FormattedMessage id="form.agency_document_note" />
              </p>
            </div>
          </div>

          <button
            className="bg-azure-blue my-4 max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            disabled={submitStarted}
          >
            {submitStarted === true ? (
              <>
                <SpinnerIcon className="mr-3 h-5 w-5" />
                {intl.formatMessage({ id: 'general.saving' })}
              </>
            ) : (
              intl.formatMessage({ id: 'general.submit' })
            )}
          </button>
        </form>
      </div>
    </CustomModal>
  );
}
