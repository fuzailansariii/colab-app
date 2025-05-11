"use client";
import { useEffect, useRef, useState } from "react";
import JoinRoom from "../../../components/JoinRoom";
import CreateRoom from "../../../components/CreateRoom";
import axios from "axios";
import RoomCard from "../../../components/RoomCard";
import { toast } from "sonner";

interface Room {
  id: string;
  roomTitle: string;
  joiningId: string;
  createdAt: string;
  createdBy: string;
}

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

  const [rooms, setRooms] = useState<Room[]>([]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("/api/all-rooms");
      setRooms(response.data.allRooms);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching rooms:", error.message);
        toast.error("Failed to fetching rooms: ");
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

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
              fetchRooms={fetchRooms}
            />
          )}
        </div>
      </div>
      <div className="md:max-w-screen-xl mx-auto p-4">
        <div className="flex flex-col gap-4 mt-4">
          {rooms.length === 0 ? (
            <h1 className="text-center">"No Room Exist"</h1>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rooms.map((room: Room) => (
                <RoomCard
                  key={room.id}
                  id={room.id}
                  roomTitle={room.roomTitle}
                  joiningId={room.joiningId}
                  createdBy={room.createdBy}
                  fetchRooms={fetchRooms}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
