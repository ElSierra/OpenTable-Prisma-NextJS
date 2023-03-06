import { AuthenticationContext } from "./../app/context/AuthContext";
import axios from "axios";
import { useContext } from "react";

export const useAuth = () => {
  const { loading, data, error, setAuthState } = useContext(
    AuthenticationContext
  );
  const signin = async ({
    email,
    password,
    handleClose,
  }: {
    email: string;
    password: string;
    handleClose: () => void;
  }) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose()
      console.log(response);
    } catch (err: any) {
      console.log("🚀 ~ file: useAuth.ts:32 ~ useAuth ~ err:", err);
      setAuthState({
        data: null,
        error: err.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const signup = async () => {};

  return {
    signin,
    signup,
  };
};
