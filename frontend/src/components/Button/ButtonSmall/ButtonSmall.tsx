import React from "react";

import "./ButtonSmall.scss";

type ButtonStandardProps = {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
};

const ButtonSmall: React.FC<ButtonStandardProps> = ({ text, onClick }) => {
  return (
    <div className="button-small" onClick={onClick}>
      {text}
    </div>
  );
};

export default ButtonSmall;
