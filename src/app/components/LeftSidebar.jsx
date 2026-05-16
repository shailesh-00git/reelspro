"use client";

import { apiClient } from "../../lib/apiClient";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function LeftSidebar() {
  const { data, status } = useSession();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await apiClient.getUserVideoCount();

        console.log("API RESPONSE:", res);

        const value = res?.count ?? res?.total ?? 0;

        setCount(value);
      } catch (err) {
        console.error("COUNT ERROR:", err);
      }
    };

    if (status === "authenticated") {
      fetchCount();
    }
  }, [status]);

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
      {status === "authenticated" && (
        <div
          className="space-y-3 p-5 border-l-3  border-green-500
       rounded-xl bg-green-50"
        >
          <p>
            <span className="text-blue-500 font-bold mr-2">Videos:</span>
            {count}
          </p>
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
