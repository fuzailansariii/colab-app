"use client";
import React, { useEffect, useRef } from "react";
import Rooms from "../rooms/page";
import CreateJoinRoom from "../../../components/JoinRoom";

export default function Dashboard() {
  const [modalType, setModelType] = React.useState<"join" | "create" | null>(
    null
  );
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modalType && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [modalType]);

  const openModal = (type: "join" | "create") => {
    setModelType(type);
  };

  const closeModal = () => {
    setModelType(null);
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-quicksand font-bold">Dashboard</h1>

        <div className="flex gap-4 items-center">
          <button
            className="btn btn-outline rounded-lg"
            onClick={() => openModal("join")}
          >
            Join Room
          </button>
          <button
            className="btn btn-outline rounded-lg"
            onClick={() => openModal("create")}
          >
            Create Room
          </button>
          {/* Modal for Join Room and Create Room */}
          {modalType === "join" && (
            <CreateJoinRoom
              modalRef={modalRef}
              closeModal={closeModal}
              placeholder={"Enter Joining Code"}
              type={"text"}
              title={"Join Room"}
            />
          )}
          {modalType === "create" && (
            <CreateJoinRoom
              modalRef={modalRef}
              closeModal={closeModal}
              placeholder={"Enter Room Name"}
              type={"text"}
              title={"Create Room"}
            />
          )}
        </div>
      </div>
      <div>
        <Rooms />
      </div>
    </div>
  );
}
