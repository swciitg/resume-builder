import React, { useState } from "react";

const DisplayResume = ({ latexData }) => {
  const [copySuccess, setCopySuccess] = useState("");

  // Function to handle copy action
  const copyToClipboard = () => {
    navigator.clipboard.writeText(latexData).then(
      () => {
        setCopySuccess("LaTeX code copied to clipboard!");
      },
      (err) => {
        setCopySuccess("Failed to copy: ", err);
      }
    );
  };

  return (
    <div className="w-full rounded bg-zinc-800 text-gray-300 px-4 py-3 overflow-x-auto">
      <button
        onClick={copyToClipboard}
        className="bg-blue-600 hover:bg-blue-700 duration-75 text-white px-4 py-2 rounded btn-submit"
      >
        Copy LaTeX Code
      </button>
      <pre>{latexData}</pre>
    </div>
  );
};

export default DisplayResume;
