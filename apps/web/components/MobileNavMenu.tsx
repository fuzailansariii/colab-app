"use client";
import { useRef } from "react";
import BarsIcon from "../icons/BarsIcon";
import Link from "next/link";
import { AuthMenu } from "../utils/AuthMenu";

export default function MobileNavMenu() {
  const menuRef = useRef<HTMLDialogElement>(null);

  const handleDialogOpen = () => {
    menuRef.current?.showModal();
  };
  const handleDialogClose = () => {
    menuRef.current?.close();
  };
  return (
    <div>
      <button
        className="flex justify-center items-center"
        onClick={handleDialogOpen}
      >
        <BarsIcon size="md" />
      </button>
      <dialog ref={menuRef} className="modal">
        <div className="modal-box flex justify-center items-center flex-col">
          <h3 className="font-bold text-lg">
            Hello! <span className="text-sm">Welcome to Colab App</span>
          </h3>
          <ul className="py-4 space-y-2">
            {AuthMenu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={handleDialogClose}
                  className="text-white hover:text-gray-400 transition duration-300 ease-in-out font-quicksand"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
