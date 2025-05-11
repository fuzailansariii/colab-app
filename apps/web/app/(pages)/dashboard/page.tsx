"use client";
import { useEffect, useRef, useState } from "react";
import Rooms from "../../../components/Rooms";
import JoinRoom from "../../../components/JoinRoom";
import CreateRoom from "../../../components/CreateRoom";

export default function Dashboard() {
  const [modalType, setModelType] = useState<"join" | "create" | null>(null);
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
      <div className="flex justify-between items-center p-4">
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
            <JoinRoom
              modalRef={modalRef}
              closeModal={closeModal}
              placeholder={"Enter Joining ID"}
              type={"text"}
              title={"Join Room"}
            />
          )}
          {modalType === "create" && (
            <CreateRoom
              modalRef={modalRef}
              closeModal={closeModal}
              placeholder={"Enter Room Title"}
              type={"text"}
              title={"Create Room"}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Rooms />
      </div>
    </div>
  );
}
