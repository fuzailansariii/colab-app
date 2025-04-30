"use client";
import Link from "next/link";
import { AuthMenu } from "../utils/AuthMenu";
import MobileNavMenu from "./MobileNavMenu";

export default function Navbar() {
  return (
    <div className="w-full text-white flex justify-between items-center py-5 px-6">
      <div className="text-xl font-bold font-quicksand">
        <Link href={"/"} className="cursor-pointer">
          Colab App
        </Link>
      </div>
      <div className="hidden md:block">
        <ul className="flex space-x-4">
          {AuthMenu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="text-white hover:text-gray-400 transition duration-300 ease-in-out font-quicksand"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="block md:hidden">
        <MobileNavMenu />
      </div>
    </div>
  );
}
