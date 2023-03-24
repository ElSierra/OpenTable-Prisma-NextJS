import convertToDisplayDate from "@/utils/convertToDisplayDate";
import { convertToDisplayTime } from "@/utils/convertToDisplayTime";
import React from "react";
import {format} from "date-fns";

export default function Header({
  name,
  main_image,
  date,
  partySize,
}: {
  name: string;
  date: string;
  partySize: string;
  main_image: string;
}) {
  const dateTime = date?.split("T");
  console.log(dateTime);
  //@ts-ignore
  const time = convertToDisplayTime(dateTime[1]);
  const dateFormatted = format(new Date(date),'ccc, LLL d')
  console.log(time)
  return (
    <div>
      <h3 className="font-bold">{"You're almost done!"}</h3>
      <div className="mt-5 flex">
        <img src={main_image} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{dateFormatted}</p>
            <p className="mr-6">{time}</p>
            <p className="mr-6">{partySize} people</p>
          </div>
        </div>
      </div>
    </div>
  );
}
