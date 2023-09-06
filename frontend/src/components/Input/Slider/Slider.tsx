import React from "react";

import "./Slider.scss";

type SliderProps = {
  value: boolean;
  onChange: () => void;
  id: string;
};

const Slider: React.FC<SliderProps> = ({ value, onChange, id }) => {
  return (
    <label className="switch" htmlFor={`slider${id}`}>
      <input
        type="checkbox"
        id={`slider${id}`}
        checked={value}
        onChange={onChange}
      />
      <div className="slider round"></div>
    </label>
  );
};
export default Slider;
