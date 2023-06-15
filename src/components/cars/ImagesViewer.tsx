import 'react-gallery-carousel/dist/index.css';

import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import NProgress from 'nprogress';
import { useRef, useState } from 'react';
import Carousel from 'react-gallery-carousel';

import CustomModal from '../customModal';
import LoaderIcon from '../LoaderIcon';

export default function ImagesViewer(props) {
  const {
    warehouse,
    loading,
    store,
    shipping,
    car_id: carId,
    single_image: singleImage,
  } = props;
  const [images, setImages] = useState([]);
  const [downloadtype, setDownloadType] = useState('');

  const [warehouseHover, setWarehouseHover] = useState(false);
  const [loadingHover, setLoadingHover] = useState(false);
  const [storeHover, setStoreHover] = useState(false);

  const cancelButtonRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [imagesModalOpen, setImagesModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DownloadImages = () => {
    setIsSubmitting(true);
    const link = document.createElement('a');
    // link.href = '/api/customer/dimages/';
    link.href = `/api/customer/download_images/?type=${downloadtype}&car_id=${carId}&container_no=${props?.container_no}`;
    link.download = 'images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  };

  const GetImages = async (type) => {
    NProgress.start();
    setDownloading(false);
    setIsSubmitting(false);

    const res = await axios.get(
      `/api/customer/images/?type=${type}&car_id=${carId}&container_no=${props?.container_no}`
    );

    const imdatas = res.data.data;

    const imdata = res.data.data
      ? imdatas.map((img) => ({
          src: img,
        }))
      : [];

    setImages(imdata);
    setDownloadType(type);
    NProgress.done();
    setImagesModalOpen(true);
  };

  const Imagetype = () => {
    if (warehouse === true) {
      GetImages('warehouse');
    } else if (loading === true) {
      GetImages('loading');
    } else if (store === true) {
      GetImages('store');
    }
  };

  return (
    <>
      <CustomModal
        showOn={imagesModalOpen}
        initialFocus={cancelButtonRef}
        onClose={() => {
          setImagesModalOpen(false);
        }}
      >
        {images.length ? (
          <div className="dirltr">
            <div className="mb-5 inline-flex items-center rounded-full bg-indigo-100 pl-1 pr-2 text-2xl dark:bg-gray-800 ">
              <span className="mr-2 rounded-full bg-indigo-700 px-6 py-px font-bold text-indigo-100 first-letter:uppercase">
                {downloadtype}
              </span>
              <span className="px-2 leading-loose text-indigo-800 first-letter:uppercase dark:text-gray-300">
                Images →
              </span>
            </div>
            <Carousel
              shouldLazyLoad={true}
              images={images}
              style={{ height: '30vw', width: '100%', objectFit: 'cover' }}
              canAutoPlay={true}
              autoPlayInterval={4000}
              isAutoPlaying={true}
            />
            <div>
              <div className="text-dark-blue mt-1 text-center sm:mt-3">
                <div>
                  <button
                    disabled={downloading}
                    onClick={() => {
                      const url = `${process.env.NEXT_PUBLIC_API_URL}getDownloadableImages/?type=${downloadtype}&car_id=${carId}&container_no=${props?.container_no}`;
                      if (window.open(url, '_parent')) {
                        setDownloading(true);
                      }
                    }}
                    className={`mt-1 mb-2 ${
                      downloading ? 'bg-indigo-200' : 'bg-indigo-600'
                    } ${
                      images.length ? '' : 'hidden'
                    } inline-flex items-center rounded border border-transparent bg-indigo-600 px-2 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  >
                    {downloading
                      ? 'File will be downloaded shortly'
                      : 'Zip and Download'}
                  </button>
                  <br />
                  <small className={`${images.length ? '' : 'hidden'}`}>
                    {/* please note that it may take a while to zip all images */}
                    Please wait while downloading the zip file. This might take
                    several minutes.
                  </small>
                  <br />
                  <button
                    className="mt-2 inline-flex w-[120px] justify-center rounded border border-transparent bg-indigo-600 px-2 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      DownloadImages();
                    }}
                  >
                    {isSubmitting ? <LoaderIcon /> : <>Download Option 2</>}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-1 flex justify-center gap-4 sm:mt-2">
              <button
                type="button"
                className="border-azure-blue text-azure-blue my-1 inline-block max-w-max rounded-full border-2 px-3 py-1 text-base font-medium"
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
              <FontAwesomeIcon icon={faImage} /> Sorry! No images found in{' '}
              {downloadtype}.
            </h1>
            <div className="mt-1 flex justify-center gap-4 sm:mt-2">
              <button
                type="button"
                className="border-azure-blue text-azure-blue my-1 inline-block max-w-max rounded-full border-2 px-3 py-1 text-base font-medium"
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
      </CustomModal>
      {singleImage ? (
        <img
          className="table_auction_img table_auction_img"
          src={singleImage}
          alt=""
          onClick={() => {
            Imagetype();
          }}
        />
      ) : (
        <div className="flex justify-center gap-2">
          {warehouse ? (
            <div
              className="w-6 cursor-pointer"
              onMouseEnter={() => {
                setWarehouseHover(true);
              }}
              onMouseLeave={() => {
                setWarehouseHover(false);
              }}
            >
              <img
                src="/assets/images/warehouseimg.png"
                alt="banner"
                onClick={() => {
                  GetImages('warehouse');
                }}
              />
              {warehouseHover && (
                <div className="relative">
                  <span className="absolute text-[9px]">Warehouse</span>
                </div>
              )}
            </div>
          ) : null}

          {loading ? (
            <div
              className="w-6 cursor-pointer"
              onMouseEnter={() => {
                setLoadingHover(true);
              }}
              onMouseLeave={() => {
                setLoadingHover(false);
              }}
            >
              <img
                src="/assets/images/loading.png"
                alt="banner"
                onClick={() => {
                  GetImages('loading');
                }}
              />
              {loadingHover && (
                <div className="relative">
                  <span className="absolute text-[9px]">Loading</span>
                </div>
              )}
            </div>
          ) : null}

          {store ? (
            <div className="w-6 cursor-pointer">
              <img
                src="/assets/images/Arrival_pics.png"
                alt="banner"
                onClick={() => {
                  GetImages('store');
                }}
                onMouseEnter={() => {
                  setStoreHover(true);
                }}
                onMouseLeave={() => {
                  setStoreHover(false);
                }}
              />
              {storeHover && (
                <div className="relative">
                  <span className="absolute text-[9px]">Store</span>
                </div>
              )}
            </div>
          ) : null}
          {shipping ? (
            <div className="w-6 cursor-pointer">
              <i
                className="material-icons cursor-pointer text-3xl"
                onClick={() => {
                  GetImages('shipping');
                }}
                onMouseEnter={() => {
                  setStoreHover(true);
                }}
                onMouseLeave={() => {
                  setStoreHover(false);
                }}
              >
                &#xe3f4;
              </i>
              {storeHover && (
                <div className="relative">
                  <span className="absolute text-[9px]">Shipping</span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
