import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { geoCentroid } from 'd3-geo';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

import allStates from '../../data/allstates.json';
import geoUrl from '../../data/geoUrl.json';

// const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const highlight = '#f5821f';

const colors = ['#0e3b5e', '#0077c9', '#43b4ff', '#c0e6ff'];

// const hexToRgb = (hex) => {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result
//     ? [
//         parseInt(result[1], 16),
//         parseInt(result[2], 16),
//         parseInt(result[3], 16),
//       ]
//     : null;
// };

// const getTextColor = (rgb) => {
//   const o = Math.round(
//     (parseInt(rgb[0], 10) * 299 +
//       parseInt(rgb[1], 10) * 587 +
//       parseInt(rgb[2], 10) * 114) /
//       1000
//   );
//   return o > 125 ? '#444444' : '#FFFFFF';
// };

const offsets = {
  // MA: [30, -1],
  // RI: [28, 2],
  // CT: [35, 10],
  // NJ: [34, 1],
  // DE: [33, 0],
  // MD: [47, 10],
  // DC: [49, 21],
};

const statesWithColors = allStates.map((state) => ({
  fill: colors[(Math.random() * (colors.length - 1)).toFixed()],
  ...state,
}));
const MapChart = ({ carsRecords }) => {
  const router = useRouter();
  const { locale } = router;
  // const [activeGeo, setActiveGeo] = useState('');

  // const contentRef = useRef<HTMLDivElement>(null);
  const [openNote, setOpenNote] = useState(false);

  const [carDetail, setCarDetail] = useState([] as any);

  function closeModal() {
    setOpenNote(false);
  }

  const carData = [
    {
      name: 'status.new_jersey',
      id: '34',
      value: 'NJ',
      nw: carsRecords?.newCarsNG,
      pc: carsRecords?.newLeftCarsNG,
      wa: carsRecords?.newWearhouseCarsNG,
      lo: carsRecords?.newLoadingCarsNG,
      po: carsRecords?.newArrivePortCarsNG,
      st: carsRecords?.newArriveStoreCarsNG,
    },
    {
      name: 'status.texas',
      id: '48',
      value: 'TX',
      nw: carsRecords?.newCarsTX,
      pc: carsRecords?.newLeftCarsTX,
      wa: carsRecords?.newWearhouseCarsTX,
      lo: carsRecords?.newLoadingCarsTX,
      po: carsRecords?.newArrivePortCarsTX,
      st: carsRecords?.newArriveStoreCarsTX,
    },
    {
      name: 'status.georgia',
      id: '13',
      value: 'GA',
      nw: carsRecords?.newCarsGA,
      pc: carsRecords?.newLeftCarsGA,
      wa: carsRecords?.newWearhouseCarsGA,
      lo: carsRecords?.newLoadingCarsGA,
      po: carsRecords?.newArrivePortCarsGA,
      st: carsRecords?.newArriveStoreCarsGA,
    },
    {
      name: 'status.washington',
      id: '53',
      value: 'WA',
      nw: carsRecords?.newCarsWA,
      pc: carsRecords?.newLeftCarsWA,
      wa: carsRecords?.newWearhouseCarsWA,
      lo: carsRecords?.newLoadingCarsWA,
      po: carsRecords?.newArrivePortCarsWA,
      st: carsRecords?.newArriveStoreCarsWA,
    },
    {
      name: 'status.california',
      id: '06',
      value: 'CA',
      nw: carsRecords?.newCarsCA,
      pc: carsRecords?.newLeftCarsCA,
      wa: carsRecords?.newWearhouseCarsCA,
      lo: carsRecords?.newLoadingCarsCA,
      po: carsRecords?.newArrivePortCarsCA,
      st: carsRecords?.newArriveStoreCarsCA,
    },
  ];

  function mapPopup(geo) {
    const car = carData.find((item) => item.id === geo);
    setCarDetail(car && car);

    if (car) {
      setOpenNote(true);
    }
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

          <div className="dirltr fixed inset-0 overflow-y-auto ">
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
                    <p
                      className={`float-${
                        locale === 'ar' ? 'right mr-[12px]' : 'left ml-[12px]'
                      }`}
                    >
                      <FormattedMessage id="page.customer.dashboard.states" /> :{' '}
                      <FormattedMessage id={carDetail?.name} />
                    </p>
                    <p
                      className={`float-${
                        locale === 'ar' ? 'left ml-[14px]' : 'right mr-[14px]'
                      }  cursor-pointer text-[18px] font-bold text-[red]`}
                      onClick={closeModal}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </p>
                  </div>
                  <div className="px-5 pb-5 pt-3">
                    <div className="mt-2">
                      <p className="text-center text-xl text-gray-900">
                        <FormattedMessage id="page.customer.dashboard.new_cars" />{' '}
                        : {carDetail?.nw}
                      </p>
                      <p className="text-center text-xl text-gray-900">
                        <FormattedMessage id="status.left" /> : {carDetail?.pc}
                      </p>
                      <p className="text-center text-xl text-gray-900">
                        <FormattedMessage id="page.customer.dashboard.at_warehouse" />{' '}
                        : {carDetail?.wa}
                      </p>
                      <p className="text-center text-xl text-gray-900">
                        <FormattedMessage id="page.customer.dashboard.in_shipping" />{' '}
                        : {carDetail?.lo}
                      </p>
                      <p className="text-center text-xl text-gray-900">
                        <FormattedMessage id="page.customer.dashboard.arrived_port" />{' '}
                        : {carDetail?.po}
                      </p>
                      <p className="text-center text-xl text-gray-900">
                        <FormattedMessage id="page.customer.dashboard.arrived_store" />{' '}
                        : {carDetail?.st}
                      </p>
                    </div>

                    <div className="mt-4 text-center">
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
      <div className="p-[8%]">
        <ComposableMap
          projection="geoAlbersUsa"
          // style={{ width: '80%', height: 'auto' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => {
                  const cur = statesWithColors.find((s) => s.val === geo.id);
                  const d = carData.find((s) => s.id === geo.id);
                  // const { id, value } = d || {};
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      // onMouseEnter={() => setActiveGeo(geo.id)}
                      // onMouseEnter={() => mapPopup(geo.id)}
                      onClick={() => mapPopup(geo.id)}
                      // fill={geo.id === activeGeo ? highlight : cur.fill}
                      fill={d ? highlight : cur?.fill}
                      // fill={highlight}
                      stroke="#FFFFFF"
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })}
                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const cur = statesWithColors.find((s) => s.val === geo.id);
                  // const textFill = getTextColor(hexToRgb(cur.fill));
                  return (
                    <g key={`${geo.rsmKey}-name`}>
                      {cur &&
                        centroid[0] > -160 &&
                        centroid[0] < -67 &&
                        (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                          <Marker coordinates={centroid}>
                            {/* <text
                            y="2"
                            fontSize={14}
                            textAnchor="middle"
                            onMouseEnter={() => setActiveGeo(geo.id)}
                            onMouseLeave={() => setActiveGeo(null)}
                            style={{ cursor: 'pointer' }}
                            fill={geo.id === activeGeo ? '#FFFFFF' : textFill}
                          >
                            {cur.id}
                          </text> */}
                          </Marker>
                        ) : (
                          <Annotation
                            subject={centroid}
                            dx={offsets[cur.id][0]}
                            dy={offsets[cur.id][1]}
                          >
                            {/* <text
                            x={4}
                            fontSize={14}
                            alignmentBaseline="middle"
                            onMouseEnter={() => setActiveGeo(geo.id)}
                            onMouseLeave={() => setActiveGeo(null)}
                            style={{ cursor: 'pointer' }}
                          >
                            {cur.id}
                          </text> */}
                          </Annotation>
                        ))}
                    </g>
                  );
                })}
              </>
            )}
          </Geographies>
        </ComposableMap>
      </div>
    </>
  );
};

export default MapChart;
