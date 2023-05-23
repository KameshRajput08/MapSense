import React, { useState } from "react";

const Message = ({ message, time }) => {
  const [show, setShow] = useState(true);
  setTimeout(() => {
    setShow(false);
  }, time);

  if (!show) {
    return null;
  }

  return (
    <div className=" absolute top-0 right-0e w-screen h-screen flex items-center justify-center bg-black bg-opacity-10">
      <div className="p-8  text-lightestSlate bg-darkbg bg-opacity-90 z-[9999] rounded-3xl">
        <span className=" text-xl font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Message;
