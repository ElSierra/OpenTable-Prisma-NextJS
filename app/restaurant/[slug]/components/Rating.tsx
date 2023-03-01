import { getAverageGrade } from "@/utils/calculateReview";
import { Review } from "@prisma/client";

export const Rating = ({review}: {review: Review[]} ) => {
 
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>*****</p>
        <p className="text-reg ml-3">{getAverageGrade(review)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{review.length} Review{review.length>1 ?'s': ""}</p>
      </div>
    </div>
  );
};
