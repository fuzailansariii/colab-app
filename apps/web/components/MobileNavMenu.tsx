"use client";
import { useRef } from "react";
import BarsIcon from "../icons/BarsIcon";
import Link from "next/link";
import { AuthenticatedMenu, AuthMenu } from "../utils/AuthMenu";
import { useAuthSession } from "../hooks/useAuthSession";
import Image from "next/image";
import userAvatar from "../assets/UserAvatar.jpg";
import { signOut } from "next-auth/react";

export default function MobileNavMenu() {
  const { session, status } = useAuthSession();

  const menuRef = useRef<HTMLDialogElement>(null);

  const handleDialogOpen = () => {
    menuRef.current?.showModal();
  };
  const handleDialogClose = () => {
    menuRef.current?.close();
  };

  const handleSignout = () => {
    signOut({ callbackUrl: "/login" });
    handleDialogClose();
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
        <div className="modal-box flex-col">
          <h3 className="font-bold text-lg font-quicksand">Menu</h3>
          <div className="flex justify-center items-center p-3 mt-5">
            {status === "loading" ? (
              "loading..."
            ) : session ? (
              <div className="flex flex-col space-y-2 justify-center">
                <div className="flex space-x-2 items-center justify-center">
                  <div className="avatar">
                    <Image
                      src={userAvatar}
                      alt="UserAvatar"
                      height={50}
                      width={50}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2 text-xl font-quicksand ml-2">
                    <p>{session?.user.fullName}</p>
                    <button onClick={handleSignout} className="text-red-400">
                      Logout
                    </button>
                  </div>
                </div>
                <div className="divider" />
                <div>
                  {AuthenticatedMenu.map((item, index) => (
                    <div key={index} className="text-xl">
                      <Link
                        href={item.href}
                        onClick={handleDialogClose}
                        className="text-white hover:text-gray-400 transition duration-300 ease-in-out font-quicksand"
                      >
                        {item.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 justify-center">
                {AuthMenu.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      onClick={handleDialogClose}
                      className="text-white hover:text-gray-400 transition duration-300 ease-in-out font-quicksand"
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
