import { ReactElement } from "react";
import { CheckboxProps as Props } from "./types";

export const Checkbox = (props: Props): ReactElement => {
  const { disabled, id, name, className, onClick, checked } = props;

  return (
    <input
      className={className}
      disabled={disabled || false}
      type="checkbox"
      id={id}
      name={name}
      onClick={onClick}
      checked={checked}
    />
  );
};
