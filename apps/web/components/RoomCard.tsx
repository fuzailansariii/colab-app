"use client";

import React from "react";
import DeleteIcon from "../icons/DeleteIcon";

interface RoomCardProps {
  roomTitle: string;
  joiningId: string;
  createdBy: string;
}

export default function RoomCard({
  roomTitle,
  joiningId,
  createdBy,
}: RoomCardProps) {
  return (
    <div className="card w-96 bg-base-100 card-md shadow-sm">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-xl">{roomTitle}</h2>
          <DeleteIcon size="sm" />
        </div>
        <p>JoiningID: {joiningId}</p>
        <p>CreatedBy: {createdBy}</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary rounded-md">Join Room</button>
        </div>
      </div>
    </div>
  );
}
