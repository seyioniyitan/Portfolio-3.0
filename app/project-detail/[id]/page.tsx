import TypeA from "@/app/components/project-detail-page/type-a";
import TypeB from "@/app/components/project-detail-page/type-b";
import TypeC from "@/app/components/project-detail-page/type-c";
import TypeD from "@/app/components/project-detail-page/type-d";
import TypeE from "@/app/components/project-detail-page/type-e";
import { caseStudyData } from "@/app/lib/project-data";
import { fullProjectQuery } from "@/app/lib/queries";
import { client } from "@/app/lib/sanity";
import { notFound } from "next/navigation";
import { fullProjectData } from "@/types";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = caseStudyData.find((item) => item.id === id);

  const fullProjects: fullProjectData = await client.fetch(
    fullProjectQuery,
    {},
    { cache: "no-store" },
  );
  if (!project) {
    notFound();
  }

  // switch (project.type) {
  //   case "A":
  //     return <TypeA />;
  //   case "B":
  //     return <TypeB />;
  //   case "C":
  //     return <TypeC />;
  //   case "D":
  //     return <TypeD />;
  //   case "E":
  //     return <TypeE />;
  //   default:
  //     notFound();
  // }

  return (
    <div>
      {fullProjects.map((data, index) => (
        <TypeD key={index} />
      ))}
    </div>
  );
}
