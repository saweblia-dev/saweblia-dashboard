import React from "react";
import Logo from "../assets/logo.png";
import MrBricolage from "../assets/Mr.Bricolage.png";



function Sidebar() {
 

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('authToken');
    window.location = "/";
  };
  return (
    <div>
      <aside class=" w-1/4 p-4 ml-[-100%] fixed z-10 top-0 pb-3 px-6 flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4 flex justify-center items-center">
            <a href="" title="home">
              <img src={MrBricolage} className="w-32" alt="MrBricolage" />
            </a>
          </div>

          <div class="mt-8 text-center">
          <a href="/" title="home">
            <img
              src={Logo}
              alt=""
              class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              saweblia
            </h5>
            <span class="hidden text-gray-400 lg:block">Admin</span>
            </a>
          </div>

          <ul class="space-y-2 tracking-wide mt-8">
          <li>
              <a
                href="/"
                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                  />
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                  />
                </svg>
              
                <span class="group-hover:text-gray-700">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="Prestations"
                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                    clip-rule="evenodd"
                  />
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                  />
                </svg>
                <span class="group-hover:text-gray-700">Prestations</span>
              </a>
            </li>
            <li>
              <a
                href="Categories"
                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clip-rule="evenodd"
                  />
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                  />
                </svg>
                <span class="group-hover:text-gray-700">Categories</span>
              </a>
            </li>
            <li>
              <a
                href="Factures"
                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                    clip-rule="evenodd"
                  />
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                  />
                </svg>
                <span class="group-hover:text-gray-700">Factures</span>
              </a>
            </li>
         
            <li>
              <a
                href="commercials"
                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
                  />
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    fill-rule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="group-hover:text-gray-700">commercials</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button   onClick={handleLogout} class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span class="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
