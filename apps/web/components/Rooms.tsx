"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";

interface Room {
  id: string;
  roomTitle: string;
  joiningId: string;
  createdAt: string;
  createdBy: string;
}

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get("/api/all-rooms");
        setRooms(response.data.allRooms);
      } catch (error: any) {
        if (error === "AxiosError") {
          console.error("Error fetching rooms:", error.message);
        } else {
          console.error("Error fetching rooms:", error);
        }
      }
    }
    fetchRooms();
  }, []);
  return (
    <div className="md:max-w-screen-xl mx-auto p-4">
      <h1>
        {rooms.length === 0 ? (
          "No Room Exist"
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rooms.map((room: Room) => (
              <RoomCard
                key={room.id}
                roomTitle={room.roomTitle}
                joiningId={room.joiningId}
                createdBy={room.createdBy}
              />
            ))}
          </div>
        )}
      </h1>
    </div>
  );
}
