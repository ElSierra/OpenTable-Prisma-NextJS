import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import { RestaurantCardType } from "@/app/page";
import { getAverageGrade } from "@/utils/calculateReview";
import { getReviewTitle } from "@/utils/getReviewTitle";
import Link from "next/link";

export const RestaurantCard = ({
  restaurant: { name, price, slug, main_image, cuisine, location, reviews },
}: {
  restaurant: RestaurantCardType;
}) => {
  console.log(
    "🚀 ~ file: RestaurantCard.tsx:6 ~ RestaurantCard ~ reviews:",
    reviews
  );

  return (
    <div className="border-b flex pb-5">
      <img src={main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{name}</h2>
        <div className="flex items-start">
         <Stars reviews={reviews}/>
          <p className="ml-2 text-sm capitalize">
            {getReviewTitle(Number(getAverageGrade(reviews)))}
          </p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={price} />
            <p className="mr-4">{cuisine.name}</p>
            <p className="mr-4">{location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};
