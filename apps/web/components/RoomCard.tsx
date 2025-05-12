"use client";

import { useRef, useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RoomCardProps {
  id: string;
  roomTitle: string;
  joiningId: string;
  createdBy: string;
  fetchRooms: () => void; // Optional function to refresh the room list after deletion
}

export default function RoomCard({
  id,
  roomTitle,
  joiningId,
  createdBy,
  fetchRooms,
}: RoomCardProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
  const deleteRoomRef = useRef<HTMLDialogElement>(null);
  const openDeleteModal = () => {
    deleteRoomRef.current?.showModal();
  };
  const closeDeleteModal = () => {
    deleteRoomRef.current?.close();
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`/api/delete-room/${id}`);
      console.log("res: ", response);
      if (response.status === 200) {
        toast.success("Room deleted successfully");
        setIsDeleting(false);
        closeDeleteModal();
        // Optionally, you can refresh the room list or perform any other action here
        fetchRooms();
      } else {
        toast.error("Failed to delete room");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting rooms:", error.message);
        toast.error("Failed to delete room: ");
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleJoinRoom = async () => {
    try {
      setIsSubmitting(true);
      router.push(`/chat/${joiningId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        toast.error("Error joining Room");
      } else {
        console.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card w-96 bg-base-100 card-md shadow-sm">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-xl font-quicksand">{roomTitle}</h2>
          <button onClick={openDeleteModal} className="btn btn-ghost btn-sm">
            <DeleteIcon size="sm" />
          </button>
        </div>
        <p className="font-nunito">JoiningID: {joiningId}</p>
        <p className="font-nunito">CreatedBy: {createdBy}</p>
        <div className="justify-end card-actions">
          <button
            onClick={handleJoinRoom}
            disabled={isSubmitting}
            className="btn btn-primary rounded-md"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Join Room"
            )}
          </button>
        </div>

        {/* Are You sure "delete" */}
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <dialog ref={deleteRoomRef} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={closeDeleteModal}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-center">Are you Sure?</h3>
            <button
              className="py-4 btn btn-outline rounded-md w-full mt-6"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Delete Room"
              )}
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
}
