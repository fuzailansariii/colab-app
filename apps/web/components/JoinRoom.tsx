"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { JoinRoomSchema } from "@repo/common/types";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface JoinRoomProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  closeModal: () => void;
  type: string;
  placeholder: string;
  title: string;
}

export default function JoinRoom({
  modalRef,
  closeModal,
  type,
  placeholder,
  title,
}: JoinRoomProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof JoinRoomSchema>>({
    resolver: zodResolver(JoinRoomSchema),
    defaultValues: {
      roomId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof JoinRoomSchema>) => {
    console.log(data);
    const joiningID = data.roomId;
    // Call the API to create or join the room
    try {
      router.push(`/chat/${joiningID}`);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error Joining Room", error.message);
        toast.error("Failed to join room");
      } else {
        console.error("Error joining room", error);
      }
    }
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

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
                {...register("roomId")}
                type={type}
                className="input rounded-lg w-full"
                placeholder={placeholder}
              />
              {errors.roomId && (
                <span className="text-red-500 text-sm">
                  {errors.roomId.message}
                </span>
              )}

              <button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary mt-4 rounded-lg"
              >
                {isSubmitting ? "Joining..." : <>{title}</>}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
