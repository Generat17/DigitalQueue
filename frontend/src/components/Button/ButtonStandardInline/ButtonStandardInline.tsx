import React from "react";

import "./ButtonStandardInline.scss";

type ButtonStandardInlineProps = {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  inversion?: boolean;
};

const ButtonStandardInline: React.FC<ButtonStandardInlineProps> = ({
  text,
  onClick,
  inversion,
}) => {
  return (
    <>
      {inversion ? (
        <div className="button-standard-inline inversion" onClick={onClick}>
          {text}
        </div>
      ) : (
        <div className="button-standard-inline" onClick={onClick}>
          {text}
        </div>
      )}
    </>
  );
};

export default ButtonStandardInline;
