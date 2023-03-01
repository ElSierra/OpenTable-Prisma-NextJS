import { PrismaClient } from "@prisma/client";
import { Description } from "./components/Description";
import { Header } from "./components/Header";
import Images from "./components/Images";
import { Rating } from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import { RestaurantNavBar } from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

const prisma = new PrismaClient();
interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
}
const fetchRestaurant = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
    },
  });
  if (!restaurant) {
    throw new Error();
  }
  return restaurant;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurant(params.slug);
  console.log("🚀 ~ file: page.tsx:28 ~ restaurant", restaurant);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title title={restaurant.name} />
        <Rating />
        <Description description={restaurant.description} />
        <Images Images={restaurant.images} />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
