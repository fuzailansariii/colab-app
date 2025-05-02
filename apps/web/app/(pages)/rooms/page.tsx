"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    async function fetchRooms() {
      const response = await axios.get("/api/all-rooms");
      setRooms(response.data.allRooms);
      console.log(response.data.allRooms);
    }
    fetchRooms();
  }, []);
  return (
    <div>
      <h1>
        {rooms.length > 0 ? (
          <div>
            {rooms.map((room, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h1>{room}</h1>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "No Room Exist"
        )}
      </h1>
    </div>
  );
}
