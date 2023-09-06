import React from "react";

import "./Confirmation.scss";
import ButtonStandard from "@components/Button/ButtonStandard";

type ConfirmationProps = {
  text: string;

  yes: () => void;
  no: () => void;
};

const Confirmation: React.FC<ConfirmationProps> = ({ text, yes, no }) => {
  return (
    <div className="confirmation">
      <h1>{text}</h1>
      <div className="response">
        <div className="button">
          <ButtonStandard text={"Да"} onClick={yes} />
        </div>
        <div className="button">
          <ButtonStandard text={"Нет"} onClick={no} />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
