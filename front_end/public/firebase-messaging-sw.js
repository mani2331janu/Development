/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCNYMQ4vibtujEkwlUdoXLYbxHyFAoOzQk",
  authDomain: "medi-track-16c05.firebaseapp.com",
  projectId: "medi-track-16c05",
  messagingSenderId: "36787713396",
  appId: "1:36787713396:web:3dddef316b8927f958e821",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
