import React from "react";

import "./ButtonLogout.scss";

type ButtonLogoutProps = {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
};

const ButtonLogout: React.FC<ButtonLogoutProps> = ({ text, onClick }) => {
  return (
    <div className="button-logout" onClick={onClick}>
      {text}
    </div>
  );
};

export default ButtonLogout;
