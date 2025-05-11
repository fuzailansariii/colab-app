"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateRoomSchema } from "@repo/common/types";
import axios from "axios";
import { toast } from "sonner";

interface CreateRoomProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  closeModal: () => void;
  type: string;
  placeholder: string;
  title: string;
  fetchRooms: () => void;
}

export default function CreateRoom({
  modalRef,
  closeModal,
  type,
  placeholder,
  title,
  fetchRooms,
}: CreateRoomProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof CreateRoomSchema>>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      roomTitle: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateRoomSchema>) => {
    // API Call to create the room
    try {
      const roomTitle = data.roomTitle;
      const response = await axios.post("/api/create-room", {
        roomTitle,
      });

      if (response.status === 201) {
        toast.success(response.data.message, {
          description:
            "Your friend can now join the room using the joining code.",
        });
        closeModal();
        reset(); // Reset the form fields
        fetchRooms();
      }
    } catch (error) {
      console.error("Error creating/joining room:", error);
    }
  };

  return (
    <div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-xl font-quicksand">{title}</h3>
            <div className="flex flex-col gap-2 mt-4 max-w-sm mx-auto">
              <input
                {...register("roomTitle")}
                type={type}
                className="input rounded-lg w-full"
                placeholder={placeholder}
              />
              {errors.roomTitle && (
                <span className="text-red-500 text-sm">
                  {errors.roomTitle.message}
                </span>
              )}

              <button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary mt-4 rounded-lg"
              >
                {isSubmitting ? "Loading..." : <>{title}</>}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
