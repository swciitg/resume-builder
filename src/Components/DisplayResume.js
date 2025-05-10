import { ClipboardDocumentIcon, CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import logo from '../assets/iitg_logo_bg.png';
import Resume from './ResumeTemplate';
import LatexCode from './ResumeLatexCode';

const DisplayResume = ({ resumeData }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showLatex, setShowLatex] = useState(true);
  const latexCode = LatexCode({ resumeData });

  
  // Function to handle copy action
  const copyToClipboard = () => {
    navigator.clipboard.writeText(latexCode).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }, (err) => {
      setCopySuccess(false);
      console.error(err);
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 z-10 flex justify-between items-center pt-4">
        <button
          className="px-2 py-1 rounded bg-gray-400 text-white hover:bg-gray-500 transition relative w-32 h-10 flex items-center justify-between"
          onClick={() => setShowLatex(prev => !prev)}
        >
          <div className="flex justify-between w-full px-4 z-10">


            <EyeIcon className='h-5 w-5' />
            <CodeBracketIcon className='h-5 w-5' />
          </div>
          <span
            className={`absolute top-1 bottom-1 left-1 w-1/2 bg-gray-700 rounded transition-transform duration-300 ${showLatex ? 'translate-x-[calc(100%-0.5rem)]' : 'translate-x-0'
              }`}
          ></span>
        </button>

        {showLatex && (
          <button
            className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={copyToClipboard}
          >
            <ClipboardDocumentIcon className="w-4 h-4 text-primary_text hover:text-hover_accent" />
          </button>)}

        {copySuccess && (
          <div className="absolute left-1/2 -translate-x-1/2 px-3 py-1 text-sm 
                bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100 
                rounded shadow transition-opacity duration-300">
            Successfully Copied!
          </div>
        )}
      </div>

      {showLatex ? (
        <pre className="mt-4">{latexCode}</pre>
      ) : (
        <Resume resumeData={resumeData} />
      )}
    </div>
  );

};

export default DisplayResume;
