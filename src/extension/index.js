/*global chrome*/
import React, { useState } from "react";
import useEyeDropper from "use-eye-dropper";

const Extension = () => {
  const [pickedColors, setPickedColors] = useState(
    JSON.parse(localStorage.getItem("colors-list")) || []
  );
  const [selectedColor, setSelectedColor] = useState(null);

  const eyeDropper = useEyeDropper();

  const pickColor = async () => {
    try {
      const { sRGBHex } = await eyeDropper.open();

      setPickedColors([sRGBHex]);
      setSelectedColor(sRGBHex);
      localStorage.setItem("colors-list", JSON.stringify([sRGBHex]));
    } catch (error) {
      alert(error);
    }
  };

  const changeTheme = () => {
    if (selectedColor) {
      chrome.runtime?.sendMessage({
        type: "change-color",
        color: selectedColor,
      });
    } else {
      alert("Please select a color first.");
    }
  };

  const showColors = () => {
    return pickedColors.map((color) => (
      <li className="color flex gap-2 mt-5" key={color}>
        <span
          className={`rounded-md inline-block h-6 w-6`}
          style={{ background: color }}
        ></span>
        <span className="value hex" data-color={color}>
          {color}
        </span>
      </li>
    ));
  };

  return (
    <div className="text-center">
      <h1 className="p-3 text-[20px] text-[#9f76f3]  font-bold drop-shadow-sm">
        Theme Chnager extension
      </h1>
      <div className="flex gap-3 flex-wrap">
        <button
          className="p-2.5 h-auto w-max bg-green-300 rounded-full active:bg-blue-300"
          onClick={pickColor}
        >
          Color picker
        </button>
        <button
          className="p-2.5 h-auto w-max bg-yellow-300 rounded-full active:bg-red-300"
          onClick={changeTheme}
        >
          Change theme
        </button>
      </div>
      <ul className="all-colors">{showColors()}</ul>
    </div>
  );
};

export default Extension;