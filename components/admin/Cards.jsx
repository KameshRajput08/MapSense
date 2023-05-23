import React from "react";
import { FiUsers } from "react-icons/fi";
import { CgDanger } from "react-icons/cg";

const Cards = ({ users, places }) => {
  return (
    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
          <FiUsers size={20} />
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Users
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {users.length}
          </p>
        </div>
      </div>
      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Earnings
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            $ 46,760.89
          </p>
        </div>
      </div>
      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
          </svg>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            API Requests
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            999
          </p>
        </div>
      </div>
      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
          <CgDanger size={25} />
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            Black Spots
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {places.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
