import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import localforage from "localforage";

let messaging;
const firebaseConfig = {
  apiKey: "AIzaSyAX18nUsueZ8Enmnnr4BIRh9_cq6A_RHVI",
  authDomain: "nejoum-aljazeera-2e42e.firebaseapp.com",
  databaseURL: "https://nejoum-aljazeera-2e42e.firebaseio.com",
  projectId: "nejoum-aljazeera-2e42e",
  storageBucket: "nejoum-aljazeera-2e42e.appspot.com",
  messagingSenderId: "838558519710",
  appId: "1:838558519710:web:0baa5b8bfe159b7271c68f",
  measurementId: "G-PZRT1EY2M1",
};
const firebaseApp = initializeApp(firebaseConfig);

const findToken = () => {
  messaging = getMessaging(firebaseApp);
  return getToken(messaging, {
    vapidKey:
      "BJQeb47-EwchpJ4PJDCqMjjIod7FFlEbxIs4RUrkHkqERdG-Wcp3pQgGXtE8U7PCW7nlqgUV8FEKqGSdwCxEerg",
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
