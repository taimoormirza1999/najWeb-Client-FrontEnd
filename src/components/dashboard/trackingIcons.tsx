const NewCarIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      className="w-[30px] sm:w-[40px] md:w-[50px] ml-[8px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" />
      <circle cx="7.5" cy="14.5" r="1.5" />
      <circle cx="16.5" cy="14.5" r="1.5" />
    </svg>
  );
};

const PaymentIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      className="w-[30px] sm:w-[40px] md:w-[50px] ml-[6px]"
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
      className="w-[30px] sm:w-[40px] md:w-[50px] ml-[6px]"
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
      className="w-[30px] sm:w-[40px] md:w-[50px] ml-[6px]"
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
      className="w-[30px] sm:w-[40px] md:w-[50px] ml-[6px]"
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
      className="w-[30px] sm:w-[40px] md:w-[50px] ml-[6px]"
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
      className="w-[30px] sm:w-[40px] md:w-[50px] ml-[6px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M13 3v1h-2V3h2m-1 7.11l5.38 1.77 2.39.78-1.12 3.97c-.54-.3-.94-.71-1.14-.94L16 13.96l-1.51 1.72c-.34.4-1.28 1.32-2.49 1.32s-2.15-.92-2.49-1.32L8 13.96l-1.51 1.72c-.2.23-.6.63-1.14.93l-1.13-3.96 2.4-.79L12 10.11M15 1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1zM6 9.97V6h12v3.97L12 8 6 9.97zm10 9.71c-1.22.85-2.61 1.28-4 1.28s-2.78-.43-4-1.28C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 1.26.64 2.63.97 4 .97s2.74-.32 4-.97c1.26.65 2.62.99 4 .99h2v-2h-2c-1.39 0-2.78-.47-4-1.32z" />
    </svg>
  );
};

const PortIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      version="1.1"
      className="w-[30px] sm:w-[40px] md:w-[50px] ml-[6px]"
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
      className="w-[30px] sm:w-[40px] md:w-[50px] ml-[6px]"
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
      className="w-[30px] sm:w-[40px] md:w-[50px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
    </svg>
  );
};
const ArrivedIcon = ({ color = '#0193FF' }) => {
  return (
    <svg
      className="w-[30px] sm:w-[40px] md:w-[50px]"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 24 24"
    >
      <path d="M12,11.5C10.62,11.5 9.5,10.38 9.5,9C9.5,7.62 10.62,6.5 12,6.5C13.38,6.5 14.5,7.62 14.5,9C14.5,10.38 13.38,11.5 12,11.5M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" />
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
