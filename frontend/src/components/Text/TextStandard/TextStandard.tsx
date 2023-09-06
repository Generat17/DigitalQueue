import React from "react";

import "./TextStandard.scss";

type TextStandardProps = {
  text: string;
};

const TextStandard: React.FC<TextStandardProps> = ({ text }) => {
  return <div className="textStandard">{text}</div>;
};

export default TextStandard;
