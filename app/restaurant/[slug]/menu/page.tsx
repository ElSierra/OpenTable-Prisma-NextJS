import { NavBar } from "@/app/components/NavBar";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Header } from "../components/Header";
import Menu from "../components/Menu";

import { RestaurantNavBar } from "../components/RestaurantNavBar";


const restaurantMenu = async (slug: string) => {
  const restaurantData = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!restaurantData) throw new Error();
  return restaurantData.items;
};

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  const items =  await restaurantMenu(params.slug);
  console.log("🚀 ~ file: page.tsx:29 ~ items", items)
  return (

    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug}/>
        {/* MENU */}
        <Menu menuItems={items} />
        {/* MENU */}
      </div>

      {/* DESCRIPTION PORTION */}
    </>
  );
}
