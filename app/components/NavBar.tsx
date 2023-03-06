import Link from "next/link";
import AuthButtons from "./AuthButtons";


export const NavBar = () => {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        {" "}
        OpenTable{" "}
      </Link>
      <div>
       <AuthButtons/>
      </div>
    </nav>
  );
};
