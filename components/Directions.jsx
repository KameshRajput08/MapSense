import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { RiArrowUpDownLine, RiCheckboxBlankCircleLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import Suggestions from "./Suggestions";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import RouteData from "./RouteData";
import { toast } from "react-hot-toast";
import { BiRefresh } from "react-icons/bi";
import useLoadingModal from "../hooks/useLoadingModal";

const token = process.env.NEXT_PUBLIC_API_TOKEN;

const modes = [
  {
    mode: "Driving",
    value: "driving",
  },
  {
    mode: "Walking",
    value: "walking",
  },
  {
    mode: "Cycling",
    value: "cycling",
  },
];

const Directions = ({ show, setShow, map }) => {
  const heightRef = useRef();
  const { onClose, onOpen } = useLoadingModal();
  const [source, setSource] = useState(null);
  const [dest, setDest] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState({ value: "", type: "src" });
  const [mode, setMode] = useState("driving");
  const [routes, setRoutes] = useState(null);

  function drawRoute(data) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change

    const route = data.geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }

    map.fitBounds(
      [
        source, // southwestern corner of the bounds
        dest, // northeastern corner of the bounds
      ],
      { padding: 20 }
    );
  }

  useEffect(() => {
    async function fetchSuggestions() {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${search.value}.json?&access_token=${token}`
      );
      setSuggestions(res.data.features);
    }
    search.value !== "" && fetchSuggestions();
  }, [search]);

  const handleClick = (suggestion) => {
    const markers = document.querySelectorAll(`.${search.type}`);
    if (markers.length > 0) {
      Array.from(markers).forEach((marker) => {
        marker.remove();
      });
    }

    const input = document.querySelector(`#${search.type}`);
    if (input) input.value = suggestion.place_name;

    search.type === "src"
      ? setSource(suggestion.geometry.coordinates)
      : setDest(suggestion.geometry.coordinates);

    map.setCenter(suggestion.geometry.coordinates);

    const el = document.createElement("div");
    el.className = search.type === "src" ? "marker src" : "marker dest";

    new mapboxgl.Marker(el)
      .setLngLat(suggestion.geometry.coordinates)
      .addTo(map);
  };

  const updateRoute = async (index) => {
    setSuggestions([]);
    drawRoute(routes[index]);
  };

  useEffect(() => {
    setSuggestions([]);
    if (dest !== null && source !== null) {
      async function fetchRoute() {
        onOpen();
        try {
          const res = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/${mode}/${source[0]},${source[1]};${dest[0]},${dest[1]}?steps=true&geometries=geojson&access_token=${token}`
          );

          if (res.data.code === "NoRoute") {
            res.data.message !== "" && toast.error(res.data.message);
          }
          setRoutes(res.data.routes);
          const data = res.data.routes[0];
          drawRoute(data);
        } catch (err) {
          err?.response?.data?.message !== "" &&
            toast.error(err?.response?.data?.message);
          console.log(err);
        }
        onClose();
      }
      fetchRoute();
    }
  }, [dest, source, mode]);

  const reverse = () => {
    const src = source;
    setSource(dest);
    setDest(src);
  };

  const reset = () => {
    setDest(null);
    setSource(null);
    setSuggestions([]);
    setRoutes([]);
    const markers = document.querySelectorAll(".marker");
    if (markers.length > 0) {
      Array.from(markers).forEach((marker) => {
        marker.remove();
      });
    }
    if (map.getLayer("route")) {
      map.removeLayer("route");
    }
    if (map.getSource("route")) {
      map.removeSource("route");
    }

    const srcInput = document.getElementById("src");
    srcInput.value = "";
    const destInput = document.getElementById("dest");
    destInput.value = "";
  };

  return (
    <div
      className={`w-[22rem] max-h-screen bg-darkbg bg-opacity-90 flex flex-col transition-all absolute top-0 rounded-md m-1 ${
        show ? "left-0" : "left-[-25rem]"
      }`}
    >
      <div ref={heightRef}>
        <div className="flex items-center justify-between px-4 text-lightSlate mt-2">
          <MdClose
            size={25}
            className=" cursor-pointer"
            onClick={() => setShow(false)}
          />
          <BiRefresh
            size={25}
            className=" cursor-pointer"
            onClick={() => reset()}
          />
        </div>
        <div className="flex items-center h-28">
          <div className="flex items-center justify-center w-full gap-3 bg-opacity-20 h-full px-4">
            <div className="flex items-center flex-col gap-[4px] text-lightSlate translate-y-[2px] mr-2">
              <RiCheckboxBlankCircleLine size={20} />
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <GoLocation size={20} />
            </div>
            <div className="flex items-center justify-center flex-col w-full gap-3 h-full">
              <input
                type="text"
                id="src"
                class=" bg-bg border text-lightestSlate text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none block w-full p-2.5"
                placeholder="Starting Point"
                onChange={(e) =>
                  e.target.value !== ""
                    ? setSearch({ value: e.target.value, type: "src" })
                    : setSuggestions([])
                }
                onFocus={() => setSuggestions([])}
              />

              <input
                type="text"
                id="dest"
                class=" bg-bg border text-lightestSlate text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none block w-full p-2.5"
                placeholder="Destination"
                onChange={(e) =>
                  e.target.value !== ""
                    ? setSearch({ value: e.target.value, type: "dest" })
                    : setSuggestions([])
                }
                onFocus={() => setSuggestions([])}
              />
            </div>
            <RiArrowUpDownLine
              className="text-[#a8b2d1] translate-y-1 cursor-pointer"
              size={30}
              onClick={() => reverse()}
            />
          </div>
        </div>
      </div>

      <div className="w-[17rem] ml-10 mx-4 mb-4 my-2 p-1 rounded-3xl border-[1.5px] bg-darkbg border-lightSlate flex items-center">
        {modes.map((item, index) => (
          <div
            key={index}
            className={`rounded-3xl flex items-center justify-center whitespace-nowrap p-[2px] cursor-pointer w-full text-lightSlate text-sm ${
              mode === item.value && "bg-bg"
            }`}
            onClick={() => setMode(item.value)}
          >
            <span>{item.mode}</span>
          </div>
        ))}
      </div>

      {routes?.length > 0 && (
        <RouteData routes={routes} mode={mode} updateRoute={updateRoute} />
      )}

      {suggestions?.length > 0 && (
        <Suggestions
          map={map}
          suggestions={suggestions}
          handleClick={handleClick}
          dir={true}
        />
      )}
    </div>
  );
};

export default Directions;
