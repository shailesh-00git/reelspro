"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

function Header() {
  const { data } = useSession();

  // handle signout
  async function handleSignout() {
    try {
      await signOut();
      toast.success("user signout sucessfully");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=" py-4 px-8 space-x-4 items-center  flex justify-between bg-gray-100">
      <h1 className="font-bold text-2xl">
        Reels<span className="text-blue-500">Pro</span>
      </h1>
      <div className="px-5">
        {" "}
        {data?.user ? (
          <div className="space-x-5">
            <button
              onClick={handleSignout}
              className="border-2 border-red-500 text-red-500 px-3 py-1 rounded"
            >
              signout{" "}
            </button>
            <Link
              href={"/upload"}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              upload video
            </Link>
          </div>
        ) : (
          <div className="space-x-5">
            <Link
              href={"/login"}
              className="border-2 border-blue-500 text-blue-500 px-3 py-2 rounded"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
