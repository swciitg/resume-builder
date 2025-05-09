import { EyeIcon, FolderArrowDownIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import logo from '../assets/iitg_logo_bg.png';

export default function Navbar({ toogleDark, darkMode }) {

  const ActionButtons = () => (
    <div >
      <button
        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <FolderArrowDownIcon className="w-6 h-6 text-primary_text hover:text-hover_accent" />
      </button>

      <button
        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <EyeIcon className="w-6 h-6 text-primary_text hover:text-hover_accent" />
      </button>

      <button
        onClick={toogleDark}
        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}

      </button>


    </div>
  )

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow dark:bg-gray-900 transition">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-10 w-10 object-contain rounded-full" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Resume Builder
        </h1>
      </div>

      <ActionButtons />
    </nav>

  );
}
