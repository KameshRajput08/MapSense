import React from "react";
import {
  BsSignTurnLeftFill,
  BsSignTurnRightFill,
  BsSignTurnSlightLeftFill,
  BsSignTurnSlightRightFill,
} from "react-icons/bs";
import { TbArrowRoundaboutLeft } from "react-icons/tb";

const Step = ({ step }) => {
  let Icon = null;
  let size = null;

  if (step.maneuver.type === "turn" || "fork") {
    size = 25;
    switch (step.maneuver?.modifier) {
      case "right":
        Icon = BsSignTurnRightFill;
        break;
      case "left":
        Icon = BsSignTurnLeftFill;
        break;
      case "slight left":
        Icon = BsSignTurnSlightLeftFill;
        break;
      case "slight right":
        Icon = BsSignTurnSlightRightFill;
        break;
      default:
        break;
    }
  } else if (step.maneuver.type === "roundabout") {
    size = [25];
    Icon = TbArrowRoundaboutLeft;
  }

  if (step.maneuver.type === "arrive") Icon === null;

  const distance = step.distance / 1000;
  return (
    <div className="mb-6 flex flex-col items-start text-lightSlate hover:text-lightestSlate">
      <div className="flex items-start gap-4 mb-2">
        {step.maneuver.type === "depart" && (
          <img src="/src.png" className="w-6 mt-2" alt="" />
        )}
        {step.maneuver.type === "arrive" && (
          <img src="/dest.png" className="w-6" alt="" />
        )}
        {(Icon !== null && step.maneuver.type !== 'arrive') && <Icon size={25} />}
        <span className=" text-base font-semibold cursor-pointer">
          {step?.maneuver?.instruction}
        </span>
      </div>
      {step?.maneuver?.type !== "arrive" && (
        <div className="flex items-center gap-6 ml-3">
          <div className="flex items-center flex-col gap-[2px] text-slate translate-y-[2px] mr-2">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <span className="text-xs font-normal">
            {distance < 1
              ? `${(distance * 100).toFixed(1)} m`
              : `${distance.toFixed(1)} km`}
          </span>
        </div>
      )}
    </div>
  );
};

export default Step;
