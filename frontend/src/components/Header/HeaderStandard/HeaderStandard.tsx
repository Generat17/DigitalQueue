import React from "react";

import "./HeaderStandard.scss";
import Logo from "@components/Logo";

type HeaderStandardProps = {};

const HeaderStandard: React.FC<HeaderStandardProps> = () => {
  return (
    <div className="header-standard">
      <Logo />
    </div>
  );
};

export default HeaderStandard;
