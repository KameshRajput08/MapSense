import React from "react";
import Suggestion from "./Suggestion";

const Suggestions = ({ suggestions, handleClick, dir }) => {
  return (
    <div
      className={`fixed ${dir ? 'top-[205px]' : 'top-12'} py-2 flex flex-col px-2 gap-1 max-h-[calc(100vh - 200px)] overflow-hidden bg-darkbg bg-opacity-90`}
    >
      {suggestions.map((s) => (
        <Suggestion key={s.id} suggestion={s} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default Suggestions;
