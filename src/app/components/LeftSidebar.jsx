"use client";

import { apiClient } from "../../lib/apiClient";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function LeftSidebar() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div className="p-4">Loading session...</div>;
  }

  return (
    <div className="col-span-1  p-4 overflow-y-auto space-y-4">
      <div
        className="space-y-3 p-5 border-l-3  border-green-500
       rounded-xl bg-green-50"
      >
        <h1>
          <span className="text-blue-500 font-bold mr-2">User:</span>
          {data?.user?.email || "Not logged in"}
        </h1>
        <p>
          <span className="text-blue-500 font-bold mr-2">Status:</span>
          {status || "Not logged in"}
        </p>
      </div>
      
    </div>
  );
}

export default LeftSidebar;
