import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

export const SearchSideBar = ({
  location,
  cuisine,
  searchParams,
}: {
  location: Location[];
  cuisine: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  console.log(
    "🚀 ~ file: SearchSideBar.tsx:2 ~ SearchSideBar ~ location:",
    location
  );

  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {location.map((location) => {
          return (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, city: location.name },
              }}
              key={location.id}
            >
              <p className="font-light text-reg">{location.name}</p>
            </Link>
          );
        })}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisine.map((cuisine) => {
          return (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, cuisine: cuisine.name },
              }}
              key={cuisine.id}
            >
              <p className="font-light text-reg">{cuisine.name}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.CHEAP },
            }}
          >
            <button className="border w-full text-reg font-light rounded-l p-2">
              $
            </button>
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.REGULAR },
            }}
          >
            <button className="border-r border-t border-b w-full text-reg font-light p-2">
              $$
            </button>
          </Link>
          <Link  href={{
                pathname: "/search",
                query: { ...searchParams, price: PRICE.EXPENSIVE },
              }}>
          <button className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
            $$$
          </button></Link>
        </div>
      </div>
    </div>
  );
};
