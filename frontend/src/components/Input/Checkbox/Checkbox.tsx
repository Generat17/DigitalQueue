import React, { ChangeEvent } from "react";

import "./Checkbox.scss";

type CheckboxProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  id: number;
};

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onChange,
  checked,
  id,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id={`checkbox${id.toString()}`}
        className="checkbox"
        onChange={onChange}
        checked={checked}
        value={value}
      />
      <label htmlFor={`checkbox${id.toString()}`} onChange={() => onChange}>
        {value}
      </label>
    </>
  );
};
export default Checkbox;
