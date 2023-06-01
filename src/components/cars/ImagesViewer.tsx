import 'react-gallery-carousel/dist/index.css';

import axios from 'axios';
import NProgress from 'nprogress';
import { useRef, useState } from 'react';
import Carousel from 'react-gallery-carousel';

import CustomModal from '../customModal';

export default function ImagesViewer(props) {
  const { warehouse, loading, store, car_id: carId } = props;
  const [images, setImages] = useState([]);
  const [downloadtype, setDownloadType] = useState('');

  const cancelButtonRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [imagesModalOpen, setImagesModalOpen] = useState(false);

  const GetImages = async (type) => {
    NProgress.start();
    setDownloading(false);

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

  return (
    <>
      <CustomModal
        showOn={imagesModalOpen}
        initialFocus={cancelButtonRef}
        onClose={() => {
          setImagesModalOpen(false);
        }}
      >
        <Carousel
          images={images}
          style={{ height: '30vw', width: '100%', objectFit: 'cover' }}
          canAutoPlay={true}
          autoPlayInterval={4000}
          isAutoPlaying={true}
        />
        <div>
          <div className="text-dark-blue mt-6 text-center sm:mt-16">
            <div>
              <button
                disabled={downloading}
                onClick={() => {
                  const url = `${process.env.NEXT_PUBLIC_API_URL}getDownloadableImages/?type=${downloadtype}&car_id=${carId}&container_no=${props?.container_no}`;
                  if (window.open(url, '_parent')) {
                    setDownloading(true);
                  }
                }}
                className={`mt-4 ${
                  downloading ? 'bg-indigo-200' : 'bg-indigo-600'
                } ${
                  images.length ? '' : 'hidden'
                } inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                {downloading
                  ? 'File will be downloaded shortly'
                  : 'Zip and Download'}
              </button>
              <br />
              <small className={`${images.length ? '' : 'hidden'}`}>
                please note that it may take a while to zip all images
              </small>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-10 py-2.5 text-2xl font-medium"
            onClick={() => {
              setImagesModalOpen(false);
            }}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </CustomModal>
      <div className="flex justify-center gap-2">
        {warehouse ? (
          <div className="w-6 cursor-pointer">
            <img
              src="/assets/images/warehouseimg.png"
              alt="banner"
              onClick={() => {
                GetImages('warehouse');
              }}
            />
          </div>
        ) : null}

        {loading ? (
          <div className="w-6 cursor-pointer">
            <img
              src="/assets/images/loading.png"
              alt="banner"
              onClick={() => {
                GetImages('loading');
              }}
            />
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
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
