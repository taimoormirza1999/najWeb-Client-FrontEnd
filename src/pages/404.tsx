import React from "react";

import { Error } from '@/components/Error';

export default function Custom404() {
  return (
    <Error
      errorCode={404}
      errorMessage={"Sorry the page you are looking for does not exist TEST"}
    />
  );
}
