// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCmUxX05Zxzf1g5d9VO-8hEvea-o5enZ5Y",
  authDomain: "test-4ea5f.firebaseapp.com",
  projectId: "test-4ea5f",
  storageBucket: "test-4ea5f.appspot.com",
  messagingSenderId: "680426325566",
  appId: "1:680426325566:web:7df755533ec529cc1db36f",
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
