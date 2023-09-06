import React from "react";

import "./ButtonStandardPressed.scss";

type ButtonStandardPressedProps = {
  text: string;
  help?: string;
  onClick?: (e: React.MouseEvent) => void;
};

const ButtonStandardPressed: React.FC<ButtonStandardPressedProps> = ({
  text,
  help,
  onClick,
}) => {
  return (
    <div className="button-standard-pressed" onClick={onClick}>
      {text}
      <div className="help-text">{help}</div>
    </div>
  );
};

export default ButtonStandardPressed;
