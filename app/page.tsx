import { RestaurantCard } from "./components/RestaurantCard";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { prisma } from "@/lib/prisma";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";

console.log(process.env.DATABASE_URL);

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  slug: string;
  reviews: Review[];
  price: PRICE;
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
    },
  });
  return restaurants;
};
const fetchReviews = async (restaurant_id: number) => {
  const reviews = await prisma.review.findMany({
    where: {
      restaurant_id,
    },
  });
  return reviews;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  console.log("🚀 ~ file: page.tsx:47 ~ Home ~ restaurants:", restaurants);

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </main>
  );
}
