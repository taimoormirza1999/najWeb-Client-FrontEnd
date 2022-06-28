import React from "react";

import { Error } from '@/components/Error';

export default function Custom401() {
  return (
      <Error
        errorCode={401}
        errorMessage={"Sorry you dont have the permission to access this page"}
      />
  );
}
