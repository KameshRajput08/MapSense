import React from "react";
import { ClipLoader } from "react-spinners";
import useLoadingModal from "../../hooks/useLoadingModal";

const LoadingModel = () => {
  const { isOpen } = useLoadingModal();
  return (
    <div
      className={`absolute top-0 ${
        !isOpen ? "bg-transparent -z-50" : "bg-black bg-opacity-50 z-50"
      } left-0 w-full h-full flex items-center justify-center`}
    >
      <ClipLoader size={50} color="#fff" className={`${!isOpen && "hidden"}`} />
    </div>
  );
};

export default LoadingModel;
