const NewCarIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      className="mx-auto w-[40px] md:w-[50px]"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      enableBackground="new 0 0 16 16"
      x="0px"
      y="0px"
      viewBox="0 0 16 16"
    >
      <path
        d="M14.3,7.4c-0.2-0.1-0.3-0.2-0.4-0.3l-1.4-3c-0.1-0.2-0.3-0.5-0.5-0.7C11.7,3.2,11.4,3,11,3H5C4.6,3,4.3,3.1,4,3.4
        C3.8,3.6,3.7,3.9,3.5,4.2l-1.4,3C2,7.2,1.9,7.3,1.7,7.4C1.4,7.6,1,7.9,1,8.5V13c0,0.6,0.4,1,1,1h1v-1h10v1h1c0.6,0,1-0.4,1-1V8.5
        C15,7.9,14.6,7.6,14.3,7.4z M13,9.5c0,0.3-0.2,0.5-0.5,0.5S12,9.8,12,9.5S12.2,9,12.5,9S13,9.2,13,9.5z M11,10v1H5v-1H11z M3.5,9
        C3.8,9,4,9.2,4,9.5S3.8,10,3.5,10S3,9.8,3,9.5S3.2,9,3.5,9z M4.5,4.6c0.1-0.2,0.2-0.4,0.3-0.5C4.9,4,4.9,4,5,4h6
        c0.1,0,0.2,0,0.2,0.1c0.1,0.1,0.2,0.3,0.3,0.5L12.7,7H3.3L4.5,4.6z"
      />
      <path
        d="M14.3,7.4c-0.2-0.1-0.3-0.2-0.4-0.3l-1.4-3c-0.1-0.2-0.3-0.5-0.5-0.7C11.7,3.2,11.4,3,11,3H5C4.6,3,4.3,3.1,4,3.4
        C3.8,3.6,3.7,3.9,3.5,4.2l-1.4,3C2,7.2,1.9,7.3,1.7,7.4C1.4,7.6,1,7.9,1,8.5V13c0,0.6,0.4,1,1,1h1v-1h10v1h1c0.6,0,1-0.4,1-1V8.5
        C15,7.9,14.6,7.6,14.3,7.4z M4.5,4.6c0.1-0.2,0.2-0.4,0.3-0.5C4.9,4,4.9,4,5,4h6c0.1,0,0.2,0,0.2,0.1c0.1,0.1,0.2,0.3,0.3,0.5
        L12.7,7H3.3L4.5,4.6z M14,12H2V8.5c0,0,0.1-0.2,0.3-0.3C2.5,8.1,2.6,8,2.6,8h10.7c0.1,0,0.2,0.1,0.3,0.2C13.9,8.3,14,8.5,14,8.5V12z
        "
      />
      <path
        d="M13.7,3.9l-0.3-0.6c-0.2-0.4-0.5-0.7-0.9-0.8l-0.6-0.3l0.7-0.4c0.3-0.2,0.6-0.4,0.7-0.7l0.3-0.6L13.9,1
    c0.2,0.4,0.4,0.7,0.8,0.8l0.7,0.3l-0.5,0.2c-0.4,0.2-0.8,0.5-0.9,0.9L13.7,3.9z"
      />
    </svg>
  );
};

const PaymentIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      className="mx-auto w-[40px] md:w-[50px]"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      fill={color}
    >
      <g>
        <rect fill="none" height="24" width="24" />
        <path d="M19,14V6c0-1.1-0.9-2-2-2H3C1.9,4,1,4.9,1,6v8c0,1.1,0.9,2,2,2h14C18.1,16,19,15.1,19,14z M17,14H3V6h14V14z M10,7 c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S11.66,7,10,7z M23,7v11c0,1.1-0.9,2-2,2H4c0-1,0-0.9,0-2h17V7C22.1,7,22,7,23,7z" />
      </g>
    </svg>
  );
};

const MonetizationIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      className="mx-auto w-[40px] md:w-[50px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
    </svg>
  );
};

const AddRoadIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      className="mx-auto w-[40px] md:w-[50px]"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      fill={color}
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <polygon points="20,18 20,15 18,15 18,18 15,18 15,20 18,20 18,23 20,23 20,20 23,20 23,18" />
          <rect height="9" width="2" x="18" y="4" />
          <rect height="16" width="2" x="4" y="4" />
          <rect height="4" width="2" x="11" y="4" />
          <rect height="4" width="2" x="11" y="10" />
          <rect height="4" width="2" x="11" y="16" />
        </g>
      </g>
    </svg>
  );
};

const LocalShippingIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      version="1.1"
      className="mx-auto w-[40px] md:w-[50px]"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      enableBackground="new 0 0 24 24"
      fill={color}
    >
      <path fill="none" d="M24,1.5V24H1.5" />
      <rect x="0.6" y="14.1" width="15.5" height="0.9" />
      <path
        d="M20.8,9H18V6.5l-1.9,0.6v8.5H9.7c0,0,0,0,0,0c-0.5-0.6-1.2-0.9-2.1-0.9c-0.5,0-1,0.1-1.4,0.4l-0.7,0.5l-3.6,0l-1.4,0v1.9
	h4.3v0c0,1.5,1.3,2.8,2.8,2.8c1.6,0,2.8-1.2,2.8-2.8v0h5.6v0c0,1.5,1.3,2.8,2.8,2.8c1.6,0,2.8-1.3,2.8-2.8h1.9v-4.7L20.8,9z
	 M8.6,17.5c0,0.5-0.4,0.9-0.9,0.9c-0.5,0-0.9-0.4-0.9-0.9v0c0-0.5,0.4-0.9,0.9-0.9C8.2,16.5,8.6,16.9,8.6,17.5L8.6,17.5z M18.9,18.4
	c-0.5,0-0.9-0.4-0.9-0.9s0.4-0.9,0.9-0.9c0.5,0,0.9,0.4,0.9,0.9S19.4,18.4,18.9,18.4z M18,12.7v-2.3h2.4l1.8,2.3H18z"
      />
    </svg>
  );
};

const WarehouseIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      className="mx-auto w-[40px] md:w-[50px]"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      fill={color}
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <path d="M20,8.35V19h-2v-8H6v8H4V8.35l8-3.2L20,8.35z M22,21V7L12,3L2,7v14h6v-8h8v8H22z M11,19H9v2h2V19z M13,16h-2v2h2V16z M15,19h-2v2h2V19z" />
      </g>
    </svg>
  );
};

const BoatIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      className="mx-auto w-[40px] md:w-[50px]"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
    >
      <path d="M7.833 29.917 5.458 21.292Q5.375 20.875 5.542 20.458Q5.708 20.042 6.083 19.917L8.333 19.125V11.417Q8.333 10.375 9.042 9.688Q9.75 9 10.75 8.958H16.792V5.208Q16.792 4.667 17.146 4.313Q17.5 3.958 18 3.958H22Q22.5 3.958 22.854 4.313Q23.208 4.667 23.208 5.208V8.958H29.25Q30.25 8.958 30.958 9.667Q31.667 10.375 31.667 11.417V19.167L33.917 19.917Q34.333 20.042 34.562 20.438Q34.792 20.833 34.667 21.25L32.167 29.917Q31 29.5 30 28.812Q29 28.125 27.875 27.042Q27.625 26.792 27.312 26.667Q27 26.542 26.667 26.542Q26.375 26.542 26.083 26.688Q25.792 26.833 25.5 27.125Q24.333 28.375 23.021 29.188Q21.708 30 20 30Q18.292 30 16.979 29.188Q15.667 28.375 14.5 27.125Q14.208 26.833 13.917 26.688Q13.625 26.542 13.333 26.542Q13 26.542 12.708 26.688Q12.417 26.833 12.125 27.083Q11.042 28.167 10.021 28.833Q9 29.5 7.833 29.917ZM4.875 36.667Q4.583 36.667 4.375 36.458Q4.167 36.25 4.167 35.958Q4.167 35.667 4.375 35.458Q4.583 35.25 4.875 35.25H6.667Q8.083 35.25 9.458 34.896Q10.833 34.542 12.125 33.833Q12.375 33.708 12.688 33.646Q13 33.583 13.333 33.583Q13.667 33.583 13.979 33.646Q14.292 33.708 14.542 33.833Q15.833 34.542 17.229 34.854Q18.625 35.167 20 35.167Q21.375 35.167 22.771 34.854Q24.167 34.542 25.458 33.833Q25.708 33.708 26.021 33.646Q26.333 33.583 26.667 33.583Q27 33.583 27.312 33.646Q27.625 33.708 27.875 33.833Q29.167 34.542 30.542 34.896Q31.917 35.25 33.333 35.25H35.125Q35.417 35.25 35.625 35.458Q35.833 35.667 35.833 35.958Q35.833 36.25 35.625 36.458Q35.417 36.667 35.125 36.667H33.333Q31.583 36.667 29.917 36.25Q28.25 35.833 26.667 35Q25.083 35.833 23.375 36.25Q21.667 36.667 20 36.667Q18.333 36.667 16.625 36.25Q14.917 35.833 13.333 35Q11.75 35.833 10.083 36.25Q8.417 36.667 6.667 36.667ZM9.75 18.667 19.25 15.583Q19.583 15.458 20 15.458Q20.417 15.458 20.75 15.583L30.25 18.667V11.417Q30.25 10.958 29.958 10.667Q29.667 10.375 29.25 10.375H10.75Q10.333 10.375 10.042 10.667Q9.75 10.958 9.75 11.417Z" />
    </svg>
  );
};

const PortIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      version="1.1"
      className="mx-auto w-[40px] md:w-[50px]"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 48.68 48.68"
      enableBackground="new 0 0 48.68 48.68"
      fill={color}
    >
      <g>
        <path d="M26.39,11.54v26.64c0,0.21-0.17,0.38-0.38,0.38h-0.72c-0.21,0-0.38-0.17-0.38-0.38V11.54" />
      </g>
      <g>
        <rect
          x="13.88"
          y="36.18"
          transform="matrix(-1 -2.853730e-11 2.853730e-11 -1 61.2159 77.2331)"
          width="33.46"
          height="4.87"
        />
      </g>
      <g>
        <rect
          x="2.49"
          y="10.95"
          transform="matrix(-1 -1.109303e-11 1.109303e-11 -1 49.8327 24.4358)"
          width="44.85"
          height="2.54"
        />
      </g>
      <g>
        <rect
          x="2.49"
          y="9.83"
          transform="matrix(-1 -1.825329e-12 1.825329e-12 -1 49.8327 20.0754)"
          width="44.85"
          height="0.42"
        />
      </g>
      <g>
        <rect
          x="6.11"
          y="21.38"
          transform="matrix(-1 1.461530e-11 -1.461530e-11 -1 27.5375 49.8207)"
          width="15.31"
          height="7.06"
        />
      </g>
      <g>
        <path
          d="M35.03,38.25V11.26c0-0.17,0.14-0.32,0.32-0.32h0.86c0.17,0,0.32,0.14,0.32,0.32v26.99c0,0.17-0.14,0.32-0.32,0.32h-0.86
		C35.17,38.57,35.03,38.43,35.03,38.25z"
        />
      </g>
      <g>
        <polygon points="6.48,21.94 6.35,21.67 13.77,18.2 20.95,21.55 20.82,21.82 13.77,18.53 	" />
      </g>
      <g>
        <rect x="13.62" y="12.05" width="0.3" height="6.31" />
      </g>
    </svg>
  );
};

const MovingCarIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      version="1.1"
      className="mx-auto w-[40px] md:w-[50px]"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
      fill={color}
    >
      <path fill="none" d="M24,1.5V24H1.5" />
      <rect x="0.6" y="14.1" width="15.5" height="0.9" />
      <path
        d="M20.8,9H18V6.5l-1.9,0.6v8.5H9.7l0,0c-0.5-0.6-1.2-0.9-2.1-0.9c-0.5,0-1,0.1-1.4,0.4l-0.7,0.5H1.9H0.5v1.9h4.3l0,0
	c0,1.5,1.3,2.8,2.8,2.8c1.6,0,2.8-1.2,2.8-2.8l0,0H16l0,0c0,1.5,1.3,2.8,2.8,2.8c1.6,0,2.8-1.3,2.8-2.8h1.9v-4.7L20.8,9z M8.6,17.5
	c0,0.5-0.4,0.9-0.9,0.9S6.8,18,6.8,17.5l0,0c0-0.5,0.4-0.9,0.9-0.9C8.2,16.5,8.6,16.9,8.6,17.5L8.6,17.5z M18.9,18.4
	c-0.5,0-0.9-0.4-0.9-0.9s0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9S19.4,18.4,18.9,18.4z M18,12.7v-2.3h2.4l1.8,2.3H18z"
      />
      <path fill="none" d="M0.8-0.4h16v16h-16V-0.4z" />
      <path
        d="M13.4,3.6c-0.1-0.4-0.5-0.7-0.9-0.7H5.1c-0.4,0-0.8,0.3-0.9,0.7l-1.4,4v5.3c0,0.4,0.3,0.7,0.7,0.7h0.7
	c0.4,0,0.7-0.3,0.7-0.7v-0.7h8v0.7c0,0.4,0.3,0.7,0.7,0.7h0.7c0.4,0,0.7-0.3,0.7-0.7V7.6L13.4,3.6z M5.3,4.3h6.9l0.7,2.1H4.6
	L5.3,4.3z M13.4,10.9H4.1V7.6h9.3V10.9z"
      />
      <circle cx="5.8" cy="9.3" r="1" />
      <circle cx="11.8" cy="9.3" r="1" />
    </svg>
  );
};

const CheckCircleIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto w-[40px] md:w-[50px]"
      fill={color}
    >
      <path d="M17.583 23.958 13.458 19.833Q13.125 19.5 12.688 19.5Q12.25 19.5 11.958 19.833Q11.625 20.167 11.625 20.625Q11.625 21.083 11.917 21.417L16.667 26.125Q17.042 26.5 17.583 26.5Q18.125 26.5 18.5 26.125L28.083 16.583Q28.375 16.25 28.375 15.812Q28.375 15.375 28 15.042Q27.708 14.75 27.25 14.75Q26.792 14.75 26.458 15.083ZM20 35.833Q16.667 35.833 13.792 34.604Q10.917 33.375 8.771 31.229Q6.625 29.083 5.396 26.208Q4.167 23.333 4.167 20Q4.167 16.708 5.396 13.813Q6.625 10.917 8.771 8.771Q10.917 6.625 13.792 5.396Q16.667 4.167 20 4.167Q23.292 4.167 26.188 5.396Q29.083 6.625 31.229 8.771Q33.375 10.917 34.604 13.813Q35.833 16.708 35.833 20Q35.833 23.333 34.604 26.208Q33.375 29.083 31.229 31.229Q29.083 33.375 26.188 34.604Q23.292 35.833 20 35.833Z" />
    </svg>
  );
};
const ArrivedIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto w-[40px] md:w-[50px]"
      fill={color}
    >
      <path d="M20 30.25Q19.708 30.25 19.458 30.188Q19.208 30.125 19 29.958Q13.917 25.958 11.438 22.292Q8.958 18.625 8.958 15.042Q8.958 12.25 9.958 10.146Q10.958 8.042 12.542 6.604Q14.125 5.167 16.104 4.458Q18.083 3.75 20 3.75Q21.917 3.75 23.896 4.458Q25.875 5.167 27.458 6.604Q29.042 8.042 30.042 10.146Q31.042 12.25 31.042 15.042Q31.042 18.625 28.562 22.292Q26.083 25.958 21 29.958Q20.792 30.125 20.521 30.188Q20.25 30.25 20 30.25ZM20 17.5Q21.125 17.5 21.917 16.708Q22.708 15.917 22.708 14.792Q22.708 13.667 21.917 12.875Q21.125 12.083 20 12.083Q18.875 12.083 18.083 12.875Q17.292 13.667 17.292 14.792Q17.292 15.917 18.083 16.708Q18.875 17.5 20 17.5ZM10 36.25Q9.542 36.25 9.25 35.938Q8.958 35.625 8.958 35.208Q8.958 34.75 9.25 34.458Q9.542 34.167 10 34.167H30Q30.458 34.167 30.75 34.458Q31.042 34.75 31.042 35.208Q31.042 35.667 30.75 35.958Q30.458 36.25 30 36.25Z" />
    </svg>
  );
};

export {
  AddRoadIcon,
  ArrivedIcon,
  BoatIcon,
  CheckCircleIcon,
  LocalShippingIcon,
  MonetizationIcon,
  MovingCarIcon,
  NewCarIcon,
  PaymentIcon,
  PortIcon,
  WarehouseIcon,
};
