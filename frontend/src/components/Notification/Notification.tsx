import React from "react";

import "./Notification.scss";

type NotificationProps = {
  text: string;
  isNotification: boolean;
};

const Notification: React.FC<NotificationProps> = ({
  text,
  isNotification,
}) => {
  return (
    <div className={`notification ${isNotification ? "active" : "disable"}`}>
      {text}
    </div>
  );
};

export default Notification;
