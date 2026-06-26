import { ProjectDetail } from "@/types";
import { client } from "@/app/lib/sanity";
import { notFound } from "next/navigation";
import { fullProjectBySlugQuery } from "@/app/lib/queries";
import TypeD from "@/app/components/project-detail-page/type-d";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const projectDetail: ProjectDetail = await client.fetch(
    fullProjectBySlugQuery,
    { slug },
    { cache: "no-store" },
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
