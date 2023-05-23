import Image from "next/image";
import React from "react";

export const Table = ({ users }) => {
  return (
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th class="px-4 py-3">User</th>
              <th class="px-4 py-3">Email</th>
              <th class="px-4 py-3">Admin</th>
              <th class="px-4 py-3">Join Date</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {users.map((user) => (
              <tr key={user?._id} class="text-gray-700 dark:text-gray-400">
                <td class="px-4 py-3">
                  <div class="flex items-center text-sm">
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <Image
                        width={25}
                        height={25}
                        class="object-cover w-full h-full rounded-full"
                        src={user?.image ? user.image : "/placeholder.jpg"}
                        alt=""
                        loading="lazy"
                      />
                      <div
                        class="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p class="font-semibold">{user.name}</p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">
                        {user._id}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">{user.email}</td>
                <td class="px-4 py-3 text-xs">
                  <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                    {user.isAdmin ? "true" : "false"}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PlacesTable = ({ places }) => {
  return (
    <div class="w-full overflow-hidden rounded-lg shadow-xs mt-10">
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3">Coordinates</th>
              <th class="px-4 py-3 whitespace-nowrap">NH</th>
              <th class="px-4 py-3">Juridiction</th>
              <th class="px-4 py-3">Reason</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {places.map((place) => (
              <tr key={place?._id} class="text-gray-700 dark:text-gray-400">
                <td class="px-5 py-3">
                  <div class="flex items-center text-sm">
                    <div>
                      <p class="font-semibold">{place.name}</p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">
                        {place.district}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">{`${place.coordinates[0]}, ${place.coordinates[1]}`}</td>
                <td class="px-4 py-3 text-xs">
                  <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                    {place.NH}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm">{place.juridiction}</td>
                <td class="px-4 py-3 text-sm">{place.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
