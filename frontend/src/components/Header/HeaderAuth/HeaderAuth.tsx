import React from "react";

import "./HeaderAuth.scss";
import ButtonLogout from "@components/Button/ButtonLogout";
import Logo from "@components/Logo";

type HeaderAuthProps = {
  text?: string;
  onClick?: (e: React.MouseEvent) => void;
};

const HeaderAuth: React.FC<HeaderAuthProps> = ({ text, onClick }) => {
  return (
    <div className="header-auth">
      <Logo />
      <div>{text}</div>
      <ButtonLogout text={"Выход"} onClick={onClick} />
    </div>
  );
};

export default HeaderAuth;
