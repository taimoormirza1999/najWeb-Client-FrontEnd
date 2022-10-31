import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import localforage from "localforage";

let messaging;
const firebaseConfig = {
  apiKey: "AIzaSyCmUxX05Zxzf1g5d9VO-8hEvea-o5enZ5Y",
  authDomain: "test-4ea5f.firebaseapp.com",
  projectId: "test-4ea5f",
  storageBucket: "test-4ea5f.appspot.com",
  messagingSenderId: "680426325566",
  appId: "1:680426325566:web:7df755533ec529cc1db36f",
};
const firebaseApp = initializeApp(firebaseConfig);

const findToken = () => {
  messaging = getMessaging(firebaseApp);
  return getToken(messaging, {
    vapidKey:
      "BAENoVdkxsyIoiCOjGlQ3NTJihtG5P4wu_lT2WtFcN-YslTTIA5ftpg0eVIVOsaphK49SEW3_rkfzdziQ5mSX_Q",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        localforage.setItem("fcm_token", currentToken);
        axios.post(`/api/customer/setcustomertoken`, {
          token: currentToken,
        });
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { findToken, onMessageListener };
