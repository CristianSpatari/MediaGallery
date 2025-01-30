import { ReactElement } from "react";
import { CheckboxProps as Props } from "./types";

export const Checkbox = (props: Props): ReactElement => {
  const { disabled, id, name, fill, className, onClick, checked } = props;

  const fillStyle = fill ? "" : "";

  return (
    <input
      className={`cursor-pointer ${fillStyle} ${className}`}
      disabled={disabled || false}
      type="checkbox"
      id={id}
      name={name}
      onClick={onClick}
      checked={checked}
    />
  );
};
