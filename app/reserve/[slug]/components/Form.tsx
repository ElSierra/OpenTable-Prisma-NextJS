"use client";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { partySize } from "@/data";
import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const [day, time] = date.split("T");
  const [didBook, setDidBook] = useState(false);
  const [input, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
  });
  const [optionalInput, setOptionalInput] = useState({
    bookerOccasion: "",
    bookerRequest: "",
  });
  console.log("🚀 ~ file: Form.tsx:13 ~ Form ~ input:", input);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleOptionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionalInput({
      ...optionalInput,
      [e.target.name]: e.target.value,
    });
  };
  const {
    error: userError,
    loading: userLoading,
    data: user,
  } = useContext(AuthenticationContext);
  const [disabled, setdisabled] = useState(true);
  const { error, loading, createReservation } = useReservation();

  useEffect(() => {
    if (user) {
      setInputs({
        bookerFirstName: user.firstName,
        bookerLastName: user.lastName,
        bookerPhone: user.phone,
        bookerEmail: user.email,
      });
    }
    if (
      input.bookerFirstName &&
      input.bookerLastName &&
      input.bookerEmail &&
      input.bookerPhone
    ) {
      return setdisabled(false);
    }
    return setdisabled(true);
  }, [input, user]);

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      day,
      time,
      ...input,
      ...optionalInput,
      setDidBook,
    });
  };
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div></div>
      ) : (
        <>
          <input
            name="bookerFirstName"
            type="text"
            value={input.bookerFirstName}
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            onChange={handleChange}
          />
          <input
            value={input.bookerLastName}
            name="bookerLastName"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            onChange={handleChange}
          />
          <input
            value={input.bookerPhone}
            name="bookerPhone"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            onChange={handleChange}
          />
          <input
            value={input.bookerEmail}
            name="bookerEmail"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            value={optionalInput.bookerOccasion}
            name="bookerOccasion"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            onChange={handleOptionalChange}
          />
          <input
            value={optionalInput.bookerRequest}
            name="bookerRequest"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            onChange={handleOptionalChange}
          />
          <button
            disabled={disabled || loading}
            onClick={handleClick}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
}
