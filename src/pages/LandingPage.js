import outlook_logo from '../assets/Outlook.png';
import Resume_sample from '../assets/resume_.png';
import SWC from '../assets/SWC.png'
import iitg_logo from '../assets/iitg_logo_ng.png'
import ellipse from '../assets/ellipse_1.png';
import tilted from '../assets/tilted_resume.png';
import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';

const LandingPage = () => {
  const [src, setSrc] = useState(Resume_sample);

  useEffect(() => {
    const updateSrc = () => {
      if (window.innerWidth < 768) {
        setSrc(tilted); // Below 'md'
      } else {
        setSrc(Resume_sample); // 'md' and above
      }
    };
    window.addEventListener('resize', updateSrc);
    updateSrc();
    return () => {
      window.removeEventListener('resize', updateSrc);
    };
  }, []);

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/azuread`;
  };

  return (
    <div className="h-screen w-screen flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-3 sm:px-6 py-2 md:py-2 shadow-md dark:bg-gray-900 transition z-20 relative">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <img
            src={iitg_logo}
            alt="Logo"
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain rounded-md"
          />
          <h1 className="md:text-xl sm:text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
            Resume Builder
          </h1>
        </div>

        <div className="flex flex-row items-center space-x-1">
          <img
            src={SWC}
            alt="SWC"
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
          />
          <div className="flex flex-col text-sm sm:text-base leading-tight ml-2">
            <span className="font-bold relative sm:top-1">Students' Web</span>
            <span className="font-bold relative sm:bottom-1">Committee</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-6 py-3 xs:py-6">
        <div className="w-full max-w-6xl rounded-lg flex flex-col md:flex-row items-center justify-between px-4 py-2 xs:py-4 md:p-6 relative">
          {/* Left Section: Text */}
          <div className='h-full flex flex-col items-start justify-center space-y-4 md:space-y-5 transform md:-translate-y-10'>
            <div className="md:w-full space-y-3 xs:space-y-4 md:space-y-5">
              <h1 className="text-3xl xs:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Build Your <span className="text-blue-600">Resume</span><br />
                the Smart Way
              </h1>
              <p className="text-gray-600 text-lg">
                Tailored for IITG Students
              </p>
              <p className="text-gray-500 text-sm max-w-md">
                Endorsed by SWC — your go-to platform for creating campus-approved, code-free resumes in minutes.
              </p>

              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
              >
                <img src={outlook_logo} alt="Outlook" className="w-5 h-5" />
                <span>Continue with Outlook</span>
              </button>
            </div>
          </div>

          {/* Right Section: Resume Images */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative z-10 md:z-10 top-5">
            <img
              src={src}
              alt="Combined Resume preview"
              className="
      rounded-lg 
      object-contain 
      transform 
      -translate-y-10
      sm:max-w-sm 
      md:max-w-md 
      lg:max-w-xl 
      scale-110
      sm:scale-100 
      md:scale-100 
      lg:scale-110"
            />



            {/* <img
              src={Resume_sample}
              alt="Resume preview"
              className="rounded-lg w-full max-w-xl object-contain relative lg:bottom-20 z-10 transform lg:translate-x-40 lg:-left-10 lg:translate-y-5 scale-125 md:bottom-5 md:translate-x-40 md:translate-y-5"
            /> */}
            {/* <img
              src={Resume_sample}
              alt="Resume preview"
              className="rounded-lg w-full max-w-xl object-contain relative lg:bottom-20 lg:right-10 transform lg:-translate-x-60 lg:-translate-y-3 scale-125 md:bottom-5 md:-left-20 md:-translate-x-40 md:-translate-y-2"
            /> */}
          </div>


          {/* Ellipse */}
          <img
            src={ellipse}
            alt="Background Ellipse"
            className="absolute right-0 top-0 z-0 opacity-50 md:opacity-90 w-2/3 transform translate-x-20"
          />
          <img
            src={ellipse}
            alt="Background Ellipse"
            className="absolute right-0 top-0 z-0 opacity-50 md:opacity-90 w-1/3 transform translate-y-1/2 rotate-45"
          />
        </div>
        <div className='absolute -bottom-2 w-full z-10'>
          <Footer darkMode={false}></Footer>
        </div>
      </main >

      {/* Footer */}
    </div >
  );
};

export default LandingPage;

