export const getReviewTitle = (reviewGrade: number) => {
  if (reviewGrade >= 5) {
    return "excellent";
  } else if (reviewGrade === 4) {
    return "good";
  } else if (reviewGrade <= 3) {
    return "mid";
  } else {
    return "None";
  }
};
