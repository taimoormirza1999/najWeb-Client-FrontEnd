import React from "react";

import Link from "next/link";
import { useRouter } from 'next/router';

interface ErrorProps {
  errorCode;
  errorMessage;
}

export const Error = (props: ErrorProps) => {
  const { errorCode, errorMessage } = props;
const router = useRouter();
  // @ts-ignore
  return (
    <div className="grid-cols bg-[#F1F8FE]">
      <div className="  flex   flex-row  items-center	 items-center justify-center h-screen mx-2 my-2 overflow-hidden ">
        <div
          className={
            " gap-5  items-center flex  flex-col   items-center items-center justify-center h-screen mx-2 my-2 overflow-hidden  "
          }
        >
          <Link href="/src/pages">
            <img
              className="    h-24 w-auto"
              src={`/assets/images/Full_Logo.png`}
              alt="Logo"
            />
          </Link>
          <p className="text-lg font-medium leading-6 text-gray-900">
            {errorCode} - {errorMessage}
          </p>
          <Link href="/">
            <a className="mt-5  bg-dark-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              home page
            </a>
          </Link>
          <div onClick={() => {
            router.back();
          }}>Go Back</div>
        </div>
      </div>
    </div>
  );
};
