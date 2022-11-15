// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
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

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
