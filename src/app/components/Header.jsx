"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

function Header() {
  const { data, status } = useSession();
  // console.log(data?.user); // user is inside data
  // console.log(status); // user is inside data
  // console.log("session data", data);

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
    <div className="w-full p-4 space-x-4">
      {data?.user ? (
        <div className="space-x-5">
          <button onClick={handleSignout}>signout </button>
          <Link href={"/upload"}>upload video</Link>
        </div>
      ) : (
        <div className="space-x-5">
          <Link href={"/login"}>Login</Link>
          <Link href={"/register"}>register</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
