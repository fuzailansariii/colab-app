"use client";

import React, { RefObject } from "react";

interface CreateJoinRoomProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  closeModal: () => void;
  type: string;
  placeholder: string;
  title: string;
}

export default function CreateJoinRoom({
  modalRef,
  closeModal,
  type,
  placeholder,
  title,
}: CreateJoinRoomProps) {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl font-quicksand">{title}</h3>
          <div className="flex flex-col gap-2 mt-4 max-w-sm mx-auto">
            <input
              className="input rounded-lg w-full"
              placeholder={placeholder}
            />
            <button type="submit" className="btn btn-primary mt-4 rounded-lg">
              {title}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
