import React, { useState } from "react";
import { BsCarFrontFill } from "react-icons/bs";
import { FaWalking } from "react-icons/fa";
import { BiCycling } from "react-icons//bi";
import moment from "moment/moment";
import Step from "./Step";

function formatTimeFromSeconds(seconds) {
  const duration = moment.duration(seconds, "seconds");
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const remainingSeconds = duration.seconds();

  let time = "";
  if (days > 0) {
    time += `${days} day${days > 1 ? "s" : ""}, `;
  }
  if (hours > 0) {
    time += `${hours} hour${hours > 1 ? "s" : ""}, `;
  }
  if (minutes > 0) {
    time += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
  }
  time += `${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`;

  return time;
}

const RouteData = ({ routes, mode, updateRoute }) => {
  const [activeRoute, setActiveRoute] = useState(0);
  let Icon = null;
  switch (mode) {
    case "driving":
      Icon = BsCarFrontFill;
      break;
    case "traffic":
      Icon = BsCarFrontFill;
      break;
    case "cycling":
      Icon = BiCycling;
      break;
    case "walking":
      Icon = FaWalking;
      break;
    default:
      break;
  }

  function metersToMiles(meters) {
    const miles = meters / 1609.344;
    return miles.toFixed(2); // Round to 2 decimal places
  }

  const time = formatTimeFromSeconds(routes[activeRoute].duration);

  const distance_km = routes[activeRoute].distance / 1000.0;
  const distance_mi = metersToMiles(routes[activeRoute].distance);

  const steps = routes[activeRoute]?.legs[0]?.steps;

  return (
    <div className="w-[22rem] px-2 h-full overflow-hidden">
      <div class="mb-2 bg-bg rounded-lg p-4 w-full">
        <div class="flex">
          <div class=" text-darkSlate mr-6 h-10 w-10 bg-white rounded-full flex items-center justify-center">
            <Icon size={20} />
          </div>
          <div className=" text-lightestSlate">
            <div class="text-bold">{time}</div>
            <div>{`${distance_km} km | ${distance_mi} mi`}</div>
          </div>
        </div>
      </div>
      {routes.length > 1 && (
        <div className="flex items-center justify-center gap-4 bg-bg rounded-lg px-10 py-2">
          <span className="text-base text-lightestSlate">Routes</span>
          <div className=" w-40 p-1 rounded-3xl border-[1.5px] bg-darkbg border-lightSlate flex items-center">
            {routes.map((route, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-3xl flex items-center justify-center p-[2px] cursor-pointer w-full text-lightSlate text-sm ${
                    activeRoute === index && "bg-bg"
                  }`}
                  onClick={() => {
                    setActiveRoute(index);
                    updateRoute(index);
                  }}
                >
                  <span>{activeRoute + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {routes.length > 0 && steps?.length > 1 && (
        <div className="flex flex-col mb-2 bg-bg rounded-lg p-4 w-full max-h-72 overflow-y-scroll">
          {steps.map((step, index) => {
            return <Step key={index} step={step} />;
          })}
        </div>
      )}
    </div>
  );
};

export default RouteData;
