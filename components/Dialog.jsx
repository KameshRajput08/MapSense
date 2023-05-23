import React, { useRef } from "react";

const Dialog = ({ title, message }) => {
  const ref = useRef();
  return (
    <dialog open ref={ref}>
      {title && <h2>{title}</h2>}
      <span> {message}</span>
    </dialog>
  );
};

export default Dialog;
