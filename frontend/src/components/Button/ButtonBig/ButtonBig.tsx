import React from "react";

import "./ButtonBig.scss";

type ButtonBigProps = {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  inversion?: boolean;
};

const ButtonBig: React.FC<ButtonBigProps> = ({ text, onClick, inversion }) => {
  return (
    <>
      {inversion ? (
        <div className="button-big inversion" onClick={onClick}>
          {text}
        </div>
      ) : (
        <div className="button-big" onClick={onClick}>
          {text}
        </div>
      )}
    </>
  );
};

export default ButtonBig;
