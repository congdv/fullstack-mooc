import { useState } from "react";

export const useField = (type) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset
  };
};