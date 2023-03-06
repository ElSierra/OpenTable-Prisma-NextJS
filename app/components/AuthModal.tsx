"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import AuthModalInputs from "./AuthModalInputs";
import { useAuth } from "@/hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const renderContent = (sigIn: string, signUp: string) => {
    return isSignin ? sigIn : signUp;
  };
  const { loading, data, error } = useContext(AuthenticationContext);

  const [input, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const [disabled, setdisabled] = useState(true);
  const { signin, signup } = useAuth();
  useEffect(() => {
    if (isSignin) {
      if (input.password && input.email) {
        return setdisabled(false);
      }
    } else {
      if (
        input.firstName &&
        input.city &&
        input.email &&
        input.password &&
        input.lastName
      ) {
        return setdisabled(false);
      }
    }
    setdisabled(true);
  }, [input]);

  const handleClick = () => {
    if (isSignin) {
      signin({ email: input.email, password: input.password, handleClose });
    }
  };

  return (
    <div>
      <Button
        className={renderContent(
          "bg-blue-400 text-white border p-1 px-4 rounded mr-3",
          "bg-gray-400 text-black border p-1 px-4 rounded"
        )}
        onClick={handleOpen}
      >
        {renderContent("Sign in", "Sign up")}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ borderRadius: "20px" }}
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24  px-2 h-[600px] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              {error &&<Alert severity="error" className="mb-9">{error}</Alert>}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  {renderContent("Sign In", "Create Account")}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent(
                    "Log into your account",
                    "Create your account"
                  )}
                </h2>
                <AuthModalInputs
                  inputs={input}
                  handleChange={handleChange}
                  isSignIn={isSignin}
                />
                <button
                  disabled={disabled}
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  onClick={handleClick}
                >
                  {renderContent("Sign in", "Sign up")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
