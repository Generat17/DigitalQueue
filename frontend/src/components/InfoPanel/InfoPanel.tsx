import React from "react";

import "./InfoPanel.scss";
import Moment from "react-moment";

type InfoPanelProps = {
  text: string;
};

const InfoPanel: React.FC<InfoPanelProps> = ({ text }) => {
  return (
    <div className="info-panel">
      <div>{text}</div>
      <Moment format="YYYY-MM-DD HH:mm:ss" interval={1000} />
    </div>
  );
};

export default InfoPanel;
