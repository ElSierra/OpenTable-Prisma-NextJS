export default function convertToDisplayDate(dateString: string) {
  const date = new Date(dateString);
  const options = { weekday: "short", day: "2-digit", year: "numeric" };
  //@ts-ignore
  const formattedDate = date.toLocaleDateString(undefined, options);
  return formattedDate;
}
