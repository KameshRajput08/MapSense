import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { FiUsers } from "react-icons/fi";
import connectMongo from "../../libs/conn";
import User from "../../modals/User";
import Place from "../../modals/Place";
import Cards from "../../components/admin/Cards";
import { PlacesTable, Table } from "../../components/admin/Table";

const Dashboard = ({ users, places }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div class="flex h-screen w-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main class="h-full w-full overflow-y-auto">
        <div class="container px-6 mx-auto grid">
          <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Dashboard
          </h2>
          <Cards users={users} places={places} />
          <Table users={users} />
          <PlacesTable places={places} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps() {
  try {
    connectMongo();
    const users = await User.find({}).lean();
    const places = await Place.find({}).lean();

    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
        places: JSON.parse(JSON.stringify(places)),
      },
    };
  } catch (err) {
    return { props: { err } };
  }
}
