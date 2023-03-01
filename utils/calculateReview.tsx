import { Review } from "@prisma/client";

export const getAverageGrade = (reviews: Review[]) => {
  let sum = 0;
  for (let i = 0; i < reviews.length; i += 1) {
    sum += reviews[i].rating;
  }
  return (sum / reviews.length).toFixed(1);
};
