import {
  fullProjectQuery,
  heroQuery,
  projectShotsQuery,
} from "@/app/lib/queries";
import { client } from "@/app/lib/sanity";
import HomePage from "@/app/components/home-page";
import { HomePageData } from "@/types";

export default async function Home() {
  const [hero, projectShots, fullProjects] = await Promise.all([
    client.fetch(heroQuery, {}, { cache: "no-store" }),
    client.fetch(projectShotsQuery, {}, { cache: "no-store" }),
    client.fetch(fullProjectQuery, {}, { cache: "no-store" }),
  ]);

  const data: HomePageData = {
    hero,
  };

  return (
    <>
      <HomePage data={data} projectShots={projectShots} />
    </>
  );
}
