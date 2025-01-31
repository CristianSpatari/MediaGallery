import { ReactElement } from "react";
import { CheckboxProps as Props } from "./types";

export const Checkbox = (props: Props): ReactElement => {
  const { disabled, id, name, className, onClick, defaultChecked, checked } =
    props;

  return (
    <input
      checked={checked}
      defaultChecked={defaultChecked}
      className={className}
      disabled={disabled || false}
      type="checkbox"
      id={id}
      name={name}
      onClick={onClick}
    />
  );
};
