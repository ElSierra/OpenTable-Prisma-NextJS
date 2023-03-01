import { PrismaClient, Review } from "@prisma/client";
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
  reviews: Review[];
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
      reviews: true,
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

  const checkIfPeople = () => {
    if (restaurant.reviews.length > 1) return true;
    else return false;
  };

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title title={restaurant.name} />
        <Rating review={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images Images={restaurant.images} />
        <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
          What {restaurant.reviews.length}{" "}
          {checkIfPeople()? "people" : "person"}
          {checkIfPeople() ? "s" : ""} {checkIfPeople() ? "are": "is"} saying
        </h1>

        {restaurant.reviews.map((review) => {
          return <Reviews key={review.id} review={review} />;
        })}
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
