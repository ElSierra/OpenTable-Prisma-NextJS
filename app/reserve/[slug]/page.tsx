import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Form from "./components/Form";
import Header from "./components/Header";

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      id: true,
      main_image: true,
    },
  });
  if (!restaurant) {
    notFound();
  }
  return restaurant;
};

export default async function Reserve({
  params, searchParams
}: {
  params: { slug: string };
  searchParams: {date:string, partySize: string}
}) {
  const restauarant = await fetchRestaurantBySlug(params.slug);
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header {...restauarant} {...searchParams} />

        <Form   {...searchParams} slug={params.slug}/>
      </div>
    </div>
  );
}
