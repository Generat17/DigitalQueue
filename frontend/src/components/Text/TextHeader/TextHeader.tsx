import React from "react";

import "./TextHeader.scss";

type TextHeaderProps = {
  text: string;
};

const TextHeader: React.FC<TextHeaderProps> = ({ text }) => {
  return <div className="textHeader">{text}</div>;
};

export default TextHeader;
