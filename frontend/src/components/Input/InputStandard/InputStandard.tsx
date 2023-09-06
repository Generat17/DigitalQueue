import React, { ChangeEvent } from "react";

import "./InputStandard.scss";

type InputProps = {
  placeholder?: string;
  type: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
};

const InputStandard: React.FC<InputProps> = ({
  placeholder,
  type,
  inputValue,
  setInputValue,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
    ></input>
  );
};
export default InputStandard;
