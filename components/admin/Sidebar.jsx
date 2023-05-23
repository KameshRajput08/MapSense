import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiUsers } from "react-icons/fi";
import { IoIosWarning } from "react-icons/io";
import { MdAddTask } from "react-icons/md";

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <a
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="#"
        >
          RouteShield
        </a>
        <ul className="mt-6">
          <li className="relative px-6 py-3">
            <a
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              href="../index.html"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span className="ml-4">Dashboard</span>
            </a>
          </li>
        </ul>
        <ul>
          <li className="relative px-6 py-3">
            <Link
              href={""}
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <FiUsers size={20} />
              <span className="ml-4">Users</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              href={""}
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <IoIosWarning size={20} />
              <span className="ml-4">Black Spots</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              href={""}
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <MdAddTask size={20} />
              <span className="ml-4">Approve Suggestions</span>
            </Link>
          </li>
        </ul>
        <div className="px-6 my-6">
          <div className="flex items-center gap-4 w-full px-4 py-2 cursor-pointer text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
            <Image
              src={
                session?.user?.image ? session.user.image : "/placeholder.jpg"
              }
              className="rounded-full"
              height={30}
              width={30}
            />
            <span>{session?.user?.name}</span>
          </div>
          {/* <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
            Create account
            <span className="ml-2" aria-hidden="true">
              +
            </span>
          </button> */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
