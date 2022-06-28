import React from "react";

import { Error } from '@/components/Error';

export default function Custom500() {
  return <Error errorCode={500} errorMessage={"Internal Server Error"} />;
}
