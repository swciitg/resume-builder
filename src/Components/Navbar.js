import {
  EyeIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import logo from "../assets/iitg_logo_bg.png";
import axios from "axios";
import { useLatex } from "./LatexContext";
import { useState, useCallback, useRef } from "react";

export default function Navbar({ toogleDark, darkMode,handleLogout }) {
  const { latexCodeE } = useLatex();
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [previewTooltipVisible, setPreviewTooltipVisible] = useState(false);
  const [darkModeTooltipVisible, setDarkModeTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);
  const previewButtonRef = useRef(null);
  const darkModeButtonRef = useRef(null);

  const handlePreview = useCallback(async () => {
    setLoadingPreview(true);
    setPreviewError(null);
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/compile`, {
                latexCode: latexCodeE
            }, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      setPreviewUrl(url);
      setShowPreview(true);
      setTimeout(() => setLoadingPreview(false), 300);
    } catch (err) {
      console.error("Error generating PDF for preview:", err);
      setPreviewError(
        "Failed to generate preview. Please check your LaTeX code and try again."
      );
      setLoadingPreview(false);
    }
  }, [latexCodeE]);

  const handleClosePreview = useCallback(() => {
    setShowPreview(false);
    setTimeout(() => {
      if (previewUrl) {
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setPreviewError(null);
    }, 300);
  }, [previewUrl]);

  const handlePreviewTooltipMouseEnter = useCallback(() => {
    setPreviewTooltipVisible(true);
    if (previewButtonRef.current && tooltipRef.current) {
      const buttonRect = previewButtonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const top = buttonRect.bottom + 5;
      const left =
        buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;

      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
    }
  }, []);

  const handlePreviewTooltipMouseLeave = useCallback(() => {
    setPreviewTooltipVisible(false);
  }, []);

  const handleDarkModeTooltipMouseEnter = useCallback(() => {
    setDarkModeTooltipVisible(true);
    if (darkModeButtonRef.current && tooltipRef.current) {
      const buttonRect = darkModeButtonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const top = buttonRect.bottom + 5;
      const left =
        buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;

      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
    }
  }, []);

  const handleDarkModeTooltipMouseLeave = useCallback(() => {
    setDarkModeTooltipVisible(false);
  }, []);

  const tooltipStyles = {
    position: "absolute",
    backgroundColor: darkMode
      ? "rgba(55, 65, 81, 0.9)"
      : "rgba(243, 244, 246, 0.9)",
    color: darkMode ? "white" : "rgba(55, 65, 81, 1)",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "0.9em",
    whiteSpace: "nowrap",
    zIndex: 100,
    opacity: previewTooltipVisible || darkModeTooltipVisible ? 1 : 0,
    transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
    transform:
      previewTooltipVisible || darkModeTooltipVisible
        ? "translateY(0)"
        : "translateY(5px)",
    boxShadow: darkMode
      ? "0 2px 5px rgba(0, 0, 0, 0.4)"
      : "0 2px 5px rgba(0, 0, 0, 0.2)",
  };

  const tooltipArrowStyles = {
    content: '""',
    position: "absolute",
    top: "-5px",
    left: "50%",
    marginLeft: "-5px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: `transparent transparent ${
      darkMode ? "rgba(55, 65, 81, 0.9)" : "rgba(243, 244, 246, 0.9)"
    } transparent`,
  };

  const ActionButtons = useCallback(
    () => (
      <div style={{ position: "relative" }}>
        <button
          onClick={handlePreview}
          ref={previewButtonRef}
          onMouseEnter={handlePreviewTooltipMouseEnter}
          onMouseLeave={handlePreviewTooltipMouseLeave}
          className="mx-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-primary_text focus:ring-opacity-50"
          disabled={loadingPreview}
        >
          <EyeIcon className="w-5 h-5" />
        </button>
        <button
          onClick={toogleDark}
          ref={darkModeButtonRef}
          onMouseEnter={handleDarkModeTooltipMouseEnter}
          onMouseLeave={handleDarkModeTooltipMouseLeave}
          className="ml-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-primary_text focus:ring-opacity-50"
        >
          {darkMode ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>


           <button
          onClick={handleLogout}
          className="ml-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-primary_text focus:ring-opacity-50"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />

        </button>
        {(previewTooltipVisible || darkModeTooltipVisible) && (
          <div ref={tooltipRef} style={tooltipStyles}>
            {previewTooltipVisible
              ? "Preview Your Resume"
              : darkModeTooltipVisible
              ? darkMode
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"
              : ""}
            <div style={tooltipArrowStyles}></div>
          </div>
        )}
      </div>
    ),
    [
      darkMode,
      handlePreview,
      handlePreviewTooltipMouseEnter,
      handlePreviewTooltipMouseLeave,
      loadingPreview,
      toogleDark,
      handleDarkModeTooltipMouseEnter,
      handleDarkModeTooltipMouseLeave,
      previewTooltipVisible,
      darkModeTooltipVisible,
      tooltipStyles,
      tooltipArrowStyles,
      handleLogout,
    ]
  );

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 shadow-md dark:bg-gray-900 transition z-10 relative">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="h-9 w-9 object-contain rounded-md shadow"
          />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
            Resume Builder
          </h1>
        </div>
        <ActionButtons />
      </nav>

      {showPreview && previewUrl && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex flex-col transition-opacity duration-300 ease-in-out">
          <div className="flex justify-between items-center py-4 px-6 bg-gray-900 dark:bg-black border-b border-gray-800">
            <h2 className="text-lg font-medium text-gray-100">
              Resume Preview
            </h2>
            <button
              onClick={handleClosePreview}
              className="text-gray-400 hover:text-white transition duration-200 ease-in-out focus:outline-none"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-5xl mx-auto h-full border border-gray-200 dark:border-gray-700">
              <iframe
                src={previewUrl}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}

      {loadingPreview && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-40 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-primary_text dark:border-accent-lighter border-opacity-75"></div>
        </div>
      )}

      {previewError && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div
            className="bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-md shadow-md relative"
            role="alert"
          >
            <strong className="font-semibold">Error:</strong>
            <span className="block sm:inline ml-2">{previewError}</span>
            <span className="absolute top-2 bottom-2 right-2 px-2 py-1">
              <svg
                onClick={handleClosePreview}
                className="fill-current h-5 w-5 text-red-500 hover:text-red-400 cursor-pointer"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
