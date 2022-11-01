import "firebase/messaging";

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { findToken, onMessageListener } from "@/utils/firebase";

function PushNotificationLayout() {
  useEffect(() => {
    findToken();

    onMessageListener()
      .then((payload) => {
        console.log(payload);
        toast(
          <div>
            <h5>{payload.notification.title}</h5>
            <h6>{payload.notification.body}</h6>
          </div>,
          {
            closeOnClick: false,
          }
        );
      })
      .catch((err) => console.log('failed: ', err));
  }, []);
  return <ToastContainer />;
}

export default PushNotificationLayout;
