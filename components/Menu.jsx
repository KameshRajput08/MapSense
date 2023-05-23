import React from "react";
import { MdClose } from "react-icons/md";
import useMenuModal from "../hooks/useMenuModal";
import { FaDirections, FaSignOutAlt } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import useLoginModal from "../hooks/useLoginModal";

const Menu = ({ handleBlackSpot, setDirections }) => {
  const { isOpen, onClose } = useMenuModal();
  const { data: session } = useSession();
  const loginModel = useLoginModal();
  return (
    <div
      className={`absolute z-50 bg-darkbg top-0 ${
        isOpen ? "left-0" : "left-[-23rem]"
      } w-[18rem] h-screen transition-all duration-150`}
    >
      <div className="relative flex flex-col px-4 py-20 w-full gap-4 h-ful text-lightSlate">
        <MdClose
          className="absolute top-4 right-4 cursor-pointer"
          size={30}
          onClick={() => onClose()}
        />
        <div
          onClick={() => onClose()}
          className="flex items-center gap-5 rounded-md w-full hover:bg-bg px-4 py-2 cursor-pointer"
        >
          <BsSearch size={25} />
          <span className=" text-xl font-semibold">Search for Places</span>
        </div>
        <div
          onClick={() => {
            onClose();
            setDirections(true);
          }}
          className="flex items-center gap-5 rounded-md w-full hover:bg-bg px-4 py-2 cursor-pointer"
        >
          <FaDirections size={25} />
          <span className=" text-xl font-semibold">Get Directions</span>
        </div>
        <div
          onClick={handleBlackSpot}
          className="flex items-center gap-5 rounded-md w-full hover:bg-bg px-4 py-2 cursor-pointer"
        >
          <IoIosWarning size={25} />
          <span className=" text-xl font-semibold">Black Spot</span>
        </div>
        <div className="flex items-center gap-5 rounded-md w-full hover:bg-bg px-4 py-2 cursor-pointer">
          {session?.user ? (
            <>
              <Image
                src={
                  session?.user?.image ? session.user.image : `/placeholder.jpg`
                }
                width={25}
                height={25}
              />
              <span className=" text-xl font-semibold">
                {session.user.name}
              </span>
            </>
          ) : (
            <div
              onClick={() => {
                onClose();
                loginModel.onOpen();
              }}
              className="flex items-center gap-5 rounded-md w-full hover:bg-bg px-4 py-2 cursor-pointer"
            >
              <CiLogin size={25} />
              <span className="text-xl font-semibold">Sign In</span>
            </div>
          )}
        </div>
        {session?.user && (
          <div
            onClick={() => signOut()}
            className="flex items-center gap-5 rounded-md w-full hover:bg-bg px-4 py-2 cursor-pointer"
          >
            <FaSignOutAlt size={25} />
            <span className=" text-xl font-semibold">Sign Out</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
