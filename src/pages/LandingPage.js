import outlook_logo from '../assets/Outlook.png';
import Resume_sample from '../assets/sample.png';
import SWC from '../assets/SWC.png'
import iitg_logo from '../assets/iitg_logo_ng.png'

const LandingPage = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/azuread`;
  };

  return (
    <div className="h-screen w-screen flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-3 sm:px-6 py-2 md:py-3  shadow-md dark:bg-gray-900 transition z-10 relative">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <img
            src={iitg_logo}
            alt="Logo"
            className="h-9 w-9 object-contain rounded-md"
          />
          <h1 className="md:text-xl sm:text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
            Resume Builder
          </h1>
        </div>

        <div className='flex flex-row items-center space-x-1'>
          <img src={SWC} alt="SWC" />
          <div className='flex flex-col md:text-xl sm:text-lg leading-tight ml-2'>
            <span>Students' Web</span>
            <span>Committee</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-6 py-3 xs:py-6 ">
        <div className="w-full max-w-6xl rounded-lg flex flex-col md:flex-row items-center justify-between px-4 py-2 xs:py-4 md:p-6 relative">
          {/* Left Section: Text */}
          <div className="md:w-1/2 space-y-3 xs:space-y-4 md:space-y-5">
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

          {/* Right Section: Resume Image */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative z-0">
            <img
              src={Resume_sample}
              alt="Resume preview"
              className="rounded-lg w-full max-w-md md:max-w-lg xl:max-w-xl object-contain"
            />
          </div>


          {/* Footer */}
        </div>
      </main>
      <div className="w-full absolute bottom-0 left-0 px-4 py-2 border-t border-gray-300 bg-white dark:bg-gray-900 z-10">
        <span className="text-sm text-gray-500 font-light">
          © Students' Web Committee
        </span>
      </div>

    </div>
  );
};

export default LandingPage;
