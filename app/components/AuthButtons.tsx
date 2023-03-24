"use client";
import { useAuth } from "@/hooks/useAuth";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function AuthButtons() {
  const { error, loading, data } = useContext(AuthenticationContext);
  const {signout} = useAuth();
  console.log({ error, loading, data } )
  return (
    <div>
   
    {loading ? null : <div className="flex">
      {data ? (
        <button onClick={()=> {signout()}} className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">Logout</button>
      ) : (
        <>
          {" "}
          <AuthModal isSignin />
          <AuthModal isSignin={false} />
        </>
      )}
    </div>}</div>
  );
}
