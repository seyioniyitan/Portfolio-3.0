import { ProjectDetail } from "@/types";
import { client } from "@/app/lib/sanity";
import { notFound } from "next/navigation";
import {
  fullProjectBySlugQuery,
  projectSlugsQuery,
} from "@/app/lib/queries";
import TypeD from "@/app/components/project-detail-page/type-d";

// Revalidate cached pages at most once per hour.
export const revalidate = 3600;

// Pre-render all known project slugs at build time so visitors get
// instant static pages rather than waiting for on-demand SSR.
export async function generateStaticParams() {
  const projects = await client.fetch<{ slug: string }[]>(projectSlugsQuery);
  return projects
    .filter((p) => Boolean(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const projectDetail: ProjectDetail = await client.fetch(
    fullProjectBySlugQuery,
    { slug },
  );

  if (!projectDetail) {
    notFound();
  }

  return (
    <div>
      <TypeD data={projectDetail} />
    </div>
  );
}

