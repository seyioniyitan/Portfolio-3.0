import {
  heroQuery,
  projectShotsQuery,
  recentWorkQuery,
} from "@/app/lib/queries";
import { client } from "@/app/lib/sanity";
import HomePage from "@/app/components/home-page";
import { HomePageData } from "@/types";

// Revalidate the home page at most once per hour.
// Portfolio content is nearly static, so ISR eliminates per-request Sanity fetches.
export const revalidate = 3600;

export default async function Home() {
  const [hero, projectShots, recentWork] = await Promise.all([
    client.fetch(heroQuery),
    client.fetch(projectShotsQuery),
    client.fetch(recentWorkQuery),
  ]);

  const data: HomePageData = {
    hero,
  };

  return (
    <>
      <HomePage
        data={data}
        projectShots={projectShots}
        recentWork={recentWork}
      />
    </>
  );
}

