"use client";
import { FaRegEdit, FaSave, FaTimes } from "react-icons/fa";
import { useState } from "react";

function EditBox({
  label = "Text Box",
  onDone = (value) => {
    console.log(value);
  },
  size = "small",
  value = "",
  type = "text",
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = (e) => {
    const finalValue =
      type === "number" ? parseFloat(inputValue) || 0 : inputValue;
    onDone(finalValue);
    setIsEditingName(false);
  };

  const handleDiscard = () => {
    setInputValue(value);
    setIsEditingName(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave(e);
    }
  };

 
  return (
    <div className="flex flex-row items-center h-full gap-1">
      {isEditingName ? (
        <div className="flex flex-row items-center justify-between h-full gap-1 w-full">
          <input
            type={type}
            className={`${
              size === "medium"
                ? "text-3xl"
                : size === "small"
                ? "text-md"
                : "text-xl"
            } h-full font-bold mb-2 text-black border-2 rounded-md w-full border-accent`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className="flex space-x-4">
            <button
              onClick={handleDiscard}
              className="flex items-center justify-center px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              <FaTimes className="mr-2" /> Discard
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center px-2 py-1 bg-accent text-white rounded-md hover:bg-opacity-85 transition-colors duration-300"
            >
              <FaSave className="mr-2" /> Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1
            className={`${
              size === "medium"
                ? "text-3xl"
                : size === "small"
                ? "text-md"
                : "text-xl"
            } font-bold text-zinc-400 cursor-pointer`}
            onClick={() => setIsEditingName(true)}
          >
            {inputValue || label}
          </h1>
          <FaRegEdit
            onClick={() => setIsEditingName(true)}
            className={`${
              size === "small" ? "text-xl" : "text-4xl"
            } cursor-pointer text-gray-500`}
          />
        </>
      )}
    </div>
  );
}

export default EditBox;
