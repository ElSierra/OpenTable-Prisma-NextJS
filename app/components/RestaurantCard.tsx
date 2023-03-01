import Link from "next/link";
import Image from "next/image";
import { RestaurantCardType } from "../page";
import Price from "./Price";
interface Props {
  restaurant: RestaurantCardType;
}

export const RestaurantCard = ({ restaurant }: Props) => {
  const getReviewsLength = (len: number) => {
    if (len > 1) {
      return "reviews";
    } else {
      return "review";
    }
  };

  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img src={restaurant.main_image} alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">{restaurant.price}</div>
            <p className="ml-2">
              {restaurant.reviews
                ? `${restaurant.reviews.length} ${getReviewsLength(restaurant.reviews.length)}`
                : `0 reviews`}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
};