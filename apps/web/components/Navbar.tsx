"use client";
import Link from "next/link";
import { AuthMenu } from "../utils/AuthMenu";
import MobileNavMenu from "./MobileNavMenu";
import { useAuthSession } from "../hooks/useAuthSession";
import Image from "next/image";
import userAvatar from "../assets/UserAvatar.jpg";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { session, status } = useAuthSession();

  const handleSignout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="w-full text-white flex justify-between items-center py-5 px-6">
      <div className="text-xl font-bold font-quicksand">
        <Link href={"/"} className="cursor-pointer">
          Colab App
        </Link>
      </div>
      <div className="hidden md:block">
        <ul className="flex space-x-4">
          {/* Desktop Menu */}
          {status === "loading" ? null : session ? (
            <div className="dropdown dropdown-bottom dropdown-end">
              <button tabIndex={0} className="avatar cursor-pointer">
                <Image
                  src={userAvatar}
                  alt="UserImage"
                  width={30}
                  height={30}
                  className="rounded-xl"
                />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li className="flex space-x-2">
                  <p>
                    Hello, <span>{session.user?.fullName?.split(" ")[0]}</span>
                  </p>
                </li>
                <li>
                  <button onClick={handleSignout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            AuthMenu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-400 transition duration-300 ease-in-out font-quicksand"
                >
                  {item.title}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="block md:hidden">
        <MobileNavMenu />
      </div>
    </div>
  );
}
