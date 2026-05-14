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
    <div>
      <button onClick={handleSignout}>signout </button>
      <Link href={"/login"}>Login</Link>
      <Link href={"/register"}>register</Link>
    </div>
  );
}

export default Header;
