import { useState } from 'react';

export const useSubmitOnce = (cb) => {
  const [submitted, setSubmitted] = useState(false);

  return (e) => {
    if (!submitted) {
      setSubmitted(true);
      cb(e);
    }
  };
};
