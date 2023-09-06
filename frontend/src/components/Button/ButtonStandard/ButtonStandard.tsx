import React from "react";

import "./ButtonStandard.scss";

type ButtonStandardProps = {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  inversion?: boolean;
};

const ButtonStandard: React.FC<ButtonStandardProps> = ({
  text,
  onClick,
  inversion,
}) => {
  return (
    <>
      {inversion ? (
        <div className="button-standard inversion" onClick={onClick}>
          {text}
        </div>
      ) : (
        <div className="button-standard" onClick={onClick}>
          {text}
        </div>
      )}
    </>
  );
};

export default ButtonStandard;
