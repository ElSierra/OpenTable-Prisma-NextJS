"use client";
import Image from "next/image";
import errorImage from "../../public/icons/error.png";
export default function Error({ error }: { error: Error }) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center ">
      <Image src={errorImage} alt="error" className="w-56 mb-8" />
      <h1 className="text-3xl font-bold">404 | Not Found</h1>
    
    </div>
  );
}
