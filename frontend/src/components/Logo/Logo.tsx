import React from "react";

import "./Logo.scss";

type LogoProps = { inversion?: boolean };

const Logo: React.FC<LogoProps> = ({ inversion }) => {
  return (
    <>
      {inversion ? (
        <div className="logo inversion-logo">РЖД</div>
      ) : (
        <div className="logo">РЖД</div>
      )}
    </>
  );
};

export default Logo;
