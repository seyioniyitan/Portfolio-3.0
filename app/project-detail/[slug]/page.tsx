import { ProjectDetail, ProjectNavigationItem } from "@/types";
import { client } from "@/app/lib/sanity";
import { notFound } from "next/navigation";
import {
  fullProjectBySlugQuery,
  projectNavigationItemsQuery,
  projectSlugsQuery,
} from "@/app/lib/queries";
import TypeD from "@/app/components/project-detail-page/type-d";

// Revalidate cached pages at most once per hour.
export const revalidate = 3600;

// Pre-render all known project slugs at build time so visitors get
// instant static pages rather than waiting for on-demand SSR.
export async function generateStaticParams() {
  const projects = await client.fetch<{ slug: string }[]>(projectSlugsQuery);
  return projects.filter((p) => Boolean(p.slug)).map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [projectDetail, navigationProjects] = await Promise.all([
    client.fetch<ProjectDetail>(fullProjectBySlugQuery, { slug }),
    client.fetch<ProjectNavigationItem[]>(projectNavigationItemsQuery, {}),
  ]);

  if (!projectDetail) {
    notFound();
  }

  const currentIndex = navigationProjects.findIndex(
    (project) => project.slug === projectDetail.slug?.current,
  );
  const previousProject =
    currentIndex > 0 ? navigationProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < navigationProjects.length - 1
      ? navigationProjects[currentIndex + 1]
      : null;

  return (
    <div>
      <TypeD
        data={projectDetail}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </div>
  );
}
