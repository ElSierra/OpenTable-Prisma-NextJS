import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Link from "next/link";
import { NavBar } from "../components/NavBar";
import { Header } from "./components/Header";
import { SearchSideBar } from "./components/SearchSideBar";
import { RestaurantCard } from "./components/RestaurantCard";
import { PRICE, PrismaClient } from "@prisma/client";
import _ from "lodash";

const inter = Inter({ subsets: ["latin"] });
interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}
const select = {
  name: true,
  price: true,
  slug: true,
  main_image: true,
  id: true,
  reviews: true,
  cuisine: true,
  location: true,
};
const prisma = new PrismaClient();

const queryLocation = async (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  return prisma.restaurant.findMany({
    where,
    select,
  });
};
const Location = async () => {
  return prisma.location.findMany();
};
const Cuisine = async () => {
  return prisma.cuisine.findMany();
};

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  console.log("🚀 ~ file: page.tsx:13 ~ Search ~ searchParams", searchParams);
  const restaurant = await queryLocation(searchParams);
  const location = await Location();
  const cuisine = await Cuisine();
  console.log("🚀 ~ file: page.tsx:52 ~ location:", cuisine);
  console.log("🚀 ~ file: page.tsx:33 ~ restaurant", restaurant);

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          location={location}
          cuisine={cuisine}
          searchParams={searchParams}
        />
        {restaurant.length > 0 ? (
          <div className="w-5/6">
            {restaurant.map((restaurant) => {
              return (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              );
            })}
          </div>
        ) : (
          <div className="w-5/6">
            <p>No Restaurants Found for city of {searchParams.city}</p>
          </div>
        )}
      </div>
    </>
  );
}
