import { Link } from "react-router-dom";

import Heroicons from "../../icons/HeroIcons";

function DesktopSidebar() {
  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0">
      <div className="py-4 text-gray-500">
        <a className="ml-6 text-lg font-bold text-gray-800" href="#">
          Klinik
        </a>
        <ul className="mt-6">
          <li className="relative px-6 py-3">
            {/* <span
              className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
              aria-hidden="true"
            ></span> */}
            <Link
              className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800"
              to="/admin"
            >
              <Heroicons icon="home-outline" />
              <span className="ml-4">Dashboard</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
              to="/admin/poli"
            >
              <Heroicons icon="clipboard-document-list-outline" />
              <span className="ml-4">Poli</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
              to="/admin/doctor"
            >
              <Heroicons icon="user-circle-outline" />
              <span className="ml-4">Dokter</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
              to="/admin/jadwal"
            >
              <Heroicons icon="calendar-days-outline" />
              <span className="ml-4">Jadwal</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              to="/admin/pengunjung"
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
            >
              <Heroicons icon="chart-bar-outline" />
              <span className="ml-4">Pengunjung</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              to="/admin/pasien"
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
            >
              <Heroicons icon="user-group-outline" />
              <span className="ml-4">Pasien</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default DesktopSidebar;
