import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import CustomModal from '@/components/customModal';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';
import { classNames } from '@/utils/Functions';
import { NetworkStatus, postData } from '@/utils/network';

export default function Feedback({ validLink }) {
  const intl = useIntl();
  const closeModalRef = useRef(null);
  const [formSubmitModal, setFormSubmitModal] = useState({
    status: false,
    type: '',
    message: '',
  });
  const [inputValue, setInputValue] = useState({
    question_1: '',
    question_2: '',
    comment: '',
  });
  const redirectSeconds = 10;
  const [redirectCounter, setRedirectCounter] = useState(redirectSeconds);
  const [feedbackSaved, setFeedbackSaved] = useState(false);
  const router = useRouter();
  const token = router.query?.t || '';

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputValue.question_1 === '' || inputValue.question_2 === '') {
      setFormSubmitModal({
        status: true,
        type: 'error',
        message: intl.formatMessage({ id: 'message.please_select_rating' }),
      });
      return;
    }
    const formData = { ...inputValue, token };
    const response = await postData('/api/feedback', formData);

    if (response.success === true) {
      setFeedbackSaved(true);
      setInputValue(() => ({
        question_1: '',
        question_2: '',
        comment: '',
      }));
    } else {
      setFormSubmitModal({
        status: true,
        type: 'error',
        message: intl.formatMessage({ id: 'message.Something went wrong' }),
      });
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  }

  const updateRating = (key, value) => {
    setInputValue({ ...inputValue, [key]: value });
  };

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (!validLink || feedbackSaved) {
        router.push('/');
      }
    }, redirectSeconds * 1000);

    const counterInterval = setInterval(() => {
      setRedirectCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(counterInterval);
    };
  }, [validLink, feedbackSaved]);

  return (
    <Layout meta={<Meta title="Feedback" description="Customers Feedback" />}>
      <CustomModal
        showOn={!validLink}
        initialFocus={closeModalRef}
        onClose={() => {}}
      >
        <div className="mt-6 text-center">
          <div>
            <p className="mb-1 text-lg text-red-700 md:text-xl lg:text-2xl">
              {intl.formatMessage({ id: 'message.invalid_feedback_link' })}
            </p>
            <p className="mb-8 py-2 text-sm">
              {intl.formatMessage({ id: 'message.invalid_feedback_link_2' })}
            </p>
            <small>
              {intl.formatMessage({
                id: 'message.you_will_be_redirected',
              })}{' '}
              {redirectCounter >= 0 ? redirectCounter : ''}
            </small>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        showOn={feedbackSaved}
        initialFocus={closeModalRef}
        onClose={() => {}}
      >
        <div className="mt-6 text-center">
          <div>
            <p className="text-dark-blue mb-1 text-lg md:text-xl lg:text-2xl">
              {intl.formatMessage({ id: 'message.thank_you_for_feedback' })}
            </p>
            <p className="text-dark-blue mb-8 py-2 text-sm lg:text-xl">
              {intl.formatMessage({ id: 'message.thank_you_for_feedback_2' })}
            </p>
            <small>
              {intl.formatMessage({
                id: 'message.you_will_be_redirected',
              })}{' '}
              {redirectCounter >= 0 ? redirectCounter : ''}
            </small>
          </div>
        </div>
      </CustomModal>
      {validLink ? (
        <>
          <CustomModal
            showOn={formSubmitModal.status}
            initialFocus={closeModalRef}
            onClose={() => {
              document.documentElement.style.overflow = 'auto';
              setFormSubmitModal({
                status: false,
                type: '',
                message: '',
              });
            }}
          >
            <div
              className={classNames(
                formSubmitModal.type === 'error'
                  ? 'text-red-700'
                  : 'text-dark-blue',
                'mt-6 text-center sm:mt-16'
              )}
            >
              <div className="mt-2">
                <p className="mb-4 py-4 text-lg md:text-xl lg:py-6 lg:text-2xl">
                  {formSubmitModal.message}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center gap-4 sm:mt-6">
              <button
                type="button"
                className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
                ref={closeModalRef}
                onClick={() => {
                  document.documentElement.style.overflow = 'auto';
                  setFormSubmitModal({
                    status: false,
                    type: '',
                    message: '',
                  });
                }}
              >
                <FormattedMessage id="general.cancel" />
              </button>
            </div>
          </CustomModal>
          <div className="text-dark-blue py-12">
            <div className="container mx-auto">
              <h2 className="text-center text-3xl font-semibold lg:text-5xl">
                <FormattedMessage id="form.feedback" />
              </h2>
              <p className="py-4 text-center text-xl lg:text-2xl">
                <FormattedMessage id="form.feedback.desc" />
              </p>

              <form onSubmit={handleSubmit} autoComplete="false" method="post">
                <div className="flex w-full flex-col justify-center lg:flex-row lg:gap-8">
                  <div className="basis-1/2">
                    <div className="my-5">
                      <label
                        htmlFor="name"
                        className="text-dark-blue block text-lg font-semibold"
                      >
                        <FormattedMessage id="form.feedback.question_1" />
                      </label>
                      <div className="my-3 flex items-baseline justify-between">
                        <div className="text-center">
                          <div
                            className={classNames(
                              inputValue.question_1 === '1'
                                ? 'border-blue-700'
                                : 'border-transparent',
                              'cursor-pointer border-2  p-1 hover:border-blue-700'
                            )}
                            onClick={() => updateRating('question_1', '1')}
                          >
                            <Image
                              src="/assets/images/smiley/mood-very-bad.png"
                              alt="Very Bad"
                              width={36}
                              height={36}
                              className=""
                            />
                          </div>
                          <p className="text-center text-xs">
                            <FormattedMessage id="form.very_high_effort" />
                          </p>
                        </div>
                        <div
                          className={classNames(
                            inputValue.question_1 === '2'
                              ? 'border-blue-700'
                              : 'border-transparent',
                            'cursor-pointer border-2 p-1 min-w-[70px] text-center hover:border-blue-700'
                          )}
                          onClick={() => updateRating('question_1', '2')}
                        >
                          <Image
                            src="/assets/images/smiley/mood-bad.png"
                            alt="Bad"
                            width={36}
                            height={36}
                          />
                        </div>
                        <div
                          className={classNames(
                            inputValue.question_1 === '3'
                              ? 'border-blue-700'
                              : 'border-transparent',
                            'cursor-pointer border-2  p-1 min-w-[70px] text-center hover:border-blue-700'
                          )}
                          onClick={() => updateRating('question_1', '3')}
                        >
                          <Image
                            src="/assets/images/smiley/mood-average.png"
                            alt="Very Average"
                            width={36}
                            height={36}
                          />
                        </div>
                        <div
                          className={classNames(
                            inputValue.question_1 === '4'
                              ? 'border-blue-700'
                              : 'border-transparent',
                            'cursor-pointer border-2 p-1 min-w-[70px] text-center hover:border-blue-700'
                          )}
                          onClick={() => updateRating('question_1', '4')}
                        >
                          <Image
                            src="/assets/images/smiley/mood-good.png"
                            alt="Good"
                            width={36}
                            height={36}
                          />
                        </div>
                        <div>
                          <div
                            className={classNames(
                              inputValue.question_1 === '5'
                                ? 'border-blue-700'
                                : 'border-transparent',
                              'cursor-pointer border-2 p-1 text-center hover:border-blue-700'
                            )}
                            onClick={() => updateRating('question_1', '5')}
                          >
                            <Image
                              src="/assets/images/smiley/mood-very-good.png"
                              alt="Very Good"
                              width={36}
                              height={36}
                            />
                          </div>
                          <p className="text-center text-xs">
                            <FormattedMessage id="form.minimal_effort" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-5">
                      <label
                        htmlFor="name"
                        className="text-dark-blue block text-lg font-semibold"
                      >
                        <FormattedMessage id="form.feedback.question_2" />
                      </label>
                      <div className="my-3 flex items-baseline justify-between">
                        <div className="text-center">
                          <div
                            className={classNames(
                              inputValue.question_2 === '1'
                                ? 'border-blue-700'
                                : 'border-transparent',
                              'cursor-pointer border-2  p-1 hover:border-blue-700'
                            )}
                            onClick={() => updateRating('question_2', '1')}
                          >
                            <Image
                              src="/assets/images/smiley/mood-very-bad.png"
                              alt="Very Bad"
                              width={36}
                              height={36}
                              className=""
                            />
                          </div>
                          <p className="text-center text-xs">
                            <FormattedMessage id="form.very_high_effort" />
                          </p>
                        </div>
                        <div
                          className={classNames(
                            inputValue.question_2 === '2'
                              ? 'border-blue-700'
                              : 'border-transparent',
                            'cursor-pointer border-2 p-1 min-w-[70px] text-center hover:border-blue-700'
                          )}
                          onClick={() => updateRating('question_2', '2')}
                        >
                          <Image
                            src="/assets/images/smiley/mood-bad.png"
                            alt="Bad"
                            width={36}
                            height={36}
                          />
                        </div>
                        <div
                          className={classNames(
                            inputValue.question_2 === '3'
                              ? 'border-blue-700'
                              : 'border-transparent',
                            'cursor-pointer border-2  p-1 min-w-[70px] text-center hover:border-blue-700'
                          )}
                          onClick={() => updateRating('question_2', '3')}
                        >
                          <Image
                            src="/assets/images/smiley/mood-average.png"
                            alt="Very Average"
                            width={36}
                            height={36}
                          />
                        </div>
                        <div
                          className={classNames(
                            inputValue.question_2 === '4'
                              ? 'border-blue-700'
                              : 'border-transparent',
                            'cursor-pointer border-2 p-1 min-w-[70px] text-center hover:border-blue-700'
                          )}
                          onClick={() => updateRating('question_2', '4')}
                        >
                          <Image
                            src="/assets/images/smiley/mood-good.png"
                            alt="Good"
                            width={36}
                            height={36}
                          />
                        </div>
                        <div>
                          <div
                            className={classNames(
                              inputValue.question_2 === '5'
                                ? 'border-blue-700'
                                : 'border-transparent',
                              'cursor-pointer border-2 p-1 text-center hover:border-blue-700'
                            )}
                            onClick={() => updateRating('question_2', '5')}
                          >
                            <Image
                              src="/assets/images/smiley/mood-very-good.png"
                              alt="Very Good"
                              width={36}
                              height={36}
                            />
                          </div>
                          <p className="text-center text-xs">
                            <FormattedMessage id="form.minimal_effort" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-5">
                      <label
                        htmlFor="name"
                        className="text-dark-blue block text-lg font-semibold"
                      >
                        <FormattedMessage id="form.feedback.comment" />
                      </label>
                      <textarea
                        rows={2}
                        className="placeholder:text-medium-grey border-dark-blue w-full resize-none rounded border text-lg  focus:border-blue-800 focus:ring-0"
                        name="comment"
                        placeholder={intl.formatMessage({
                          id: 'messages.message',
                        })}
                        value={inputValue.comment}
                        onChange={handleChange}
                        maxLength={500}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="border-azure-blue bg-azure-blue hover:bg-dark-blue mx-auto my-6 flex justify-center rounded border-2 py-[6px] px-6 text-lg font-semibold text-white shadow-sm"
                >
                  <FormattedMessage id="general.submit" />
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-screen"></div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const apiUrl = process.env.API_URL;
  const token = context.query.t;
  let validLink = false;
  if (!token) {
    return NetworkStatus.LOGIN_PAGE;
  }

  try {
    const res = await axios.get(`${apiUrl}feedback/validate`, {
      data: {
        token,
      },
    });
    validLink = !!res.data.data;
  } catch (err) {
    return NetworkStatus.LOGIN_PAGE;
  }

  return {
    props: {
      validLink,
    },
  };
}
