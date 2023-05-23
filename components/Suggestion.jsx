import React from "react";

const Suggestion = ({ suggestion, handleClick, type }) => {
  const address = suggestion.place_name.split(",").slice(1).join(",").trim();

  return (
    <div
      onClick={() => handleClick(suggestion)}
      className="px-2 py-1 flex sugges flex-col items-start gap-[2px] w-[21rem] hover:bg-slate rounded-md bg-bg cursor-pointer"
    >
      <h2 className="sugges_item font-semibold text-[14px] text-lightestSlate">
        {suggestion.text}
      </h2>
      <span className="sugges_item font-normal text-[12px] text-lightSlate">
        {address}
      </span>
    </div>
  );
};

export default Suggestion;
