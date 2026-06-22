import { heroQuery, projectShotsQuery } from "@/app/lib/queries";
import { client } from "@/app/lib/sanity";
import HomePage from "@/app/components/home-page";
import { HomePageData } from "@/types";

export default async function Home() {
  const [hero, projects] = await Promise.all([
    client.fetch(heroQuery, {}, { cache: "no-store" }),
    client.fetch(projectShotsQuery, {}, { cache: "no-store" }),
  ]);

  const data: HomePageData = {
    hero,
    projects,
  };

  return (
    <>
      <HomePage data={data} />
    </>
  );
}
