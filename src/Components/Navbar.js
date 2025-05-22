import {
  EyeIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/iitg_logo_bg.png";
import axios from "axios";
import { useLatex } from "./LatexContext";
import { useState, useCallback } from "react";

export default function Navbar({ toogleDark, darkMode, handleLogout }) {
  const { latexCodeE } = useLatex();
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState(null);

  const handlePreview = useCallback(async () => {
    setLoadingPreview(true);
    setPreviewError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/compile`,
        { latexCode: latexCodeE },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      setPreviewUrl(url);
      setShowPreview(true);
      setTimeout(() => setLoadingPreview(false), 300);
    } catch (err) {
      setPreviewError("Failed to generate preview. Please try again.");
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

  const TooltipWrapper = ({ label, children }) => (
    <div className="relative group">
      {children}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:flex items-center justify-center px-4 py-2 text-sm font-semibold bg-white text-gray-500 border border-gray-300 rounded shadow-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-50 whitespace-nowrap">
        {label}
      </div>
    </div>
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

        <div className="flex items-center space-x-2">
          <TooltipWrapper label="Preview Your Resume">
            <button
              onClick={handlePreview}
              className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
          </TooltipWrapper>

          <TooltipWrapper label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <button
              onClick={toogleDark}
              className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
          </TooltipWrapper>

          <TooltipWrapper label="Logout">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </button>
          </TooltipWrapper>
        </div>
      </nav>

      {showPreview && previewUrl && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex flex-col">
          <div className="flex justify-between items-center py-4 px-6 bg-gray-900 dark:bg-black border-b border-gray-800">
            <h2 className="text-lg font-medium text-gray-100">Resume Preview</h2>
            <button
              onClick={handleClosePreview}
              className="text-gray-400 hover:text-white transition"
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-40 flex justify-center items-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-primary_text dark:border-accent-lighter border-opacity-75"></div>
        </div>
      )}

      {previewError && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-md shadow-md relative">
            <strong className="font-semibold">Error:</strong>
            <span className="ml-2">{previewError}</span>
            <span className="absolute top-2 bottom-2 right-2 px-2 py-1">
              <svg
                onClick={handleClosePreview}
                className="fill-current h-5 w-5 text-red-500 hover:text-red-400 cursor-pointer"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 01-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 111.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 111.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 010 1.698z" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
