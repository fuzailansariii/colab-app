"use client";
import React from "react";

export default function Chat() {
  return (
    <div className="max-w-2xl mx-auto min-h-[80vh] rounded-lg border shadow-lg p-4 flex flex-col">
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto mb-4 rounded p-3">
        <p className="text-gray-500">Messages will appear here...</p>
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 rounded p-2"
          placeholder="Type your message here..."
        />
        <button className="btn btn-primary rounded-md">Send</button>
      </div>
    </div>
  );
}
