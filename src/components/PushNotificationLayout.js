import React, { useEffect, useState } from "react";
import "firebase/messaging";
import { Toast } from "react-toastify";
import { findToken, onMessageListener } from "@/utils/firebase";

function PushNotificationLayout() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  useEffect(() => {
    findToken(setTokenFound);

    onMessageListener()
      .then((payload) => {
        setShow(true);
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
        console.log(payload);
      })
      .catch((err) => console.log("failed: ", err));
  }, []);
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      animation
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        minWidth: 200,
      }}
    >
      <Toast.Header>
        <strong className="mr-auto">{notification.title}</strong>
      </Toast.Header>
      <Toast.Body>{notification.body}</Toast.Body>
    </Toast>
  );
}

export default PushNotificationLayout;
