"use client";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function AuthButtons() {
  const { error, loading, data } = useContext(AuthenticationContext);
  return (
    <div className="flex">
      <AuthModal isSignin />
      <AuthModal isSignin={false} />
    </div>
  );
}
