import ContactModal from "@/app/components/contact-modal";
import Header from "@/app/components/header";
import ShuffleButtons, {
  type ProjectView,
} from "@/app/components/shuffle-buttons";
import WorkTogetherLink from "@/app/components/work-together-link";
import { fullProjectQuery, projectShotsQuery } from "@/app/lib/queries";
import { client } from "@/app/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import { fullProjectData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ProjectShotsGrid from "../components/project-shots-grid";

export default async function ProjectShots({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeView: ProjectView =
    resolvedSearchParams.view === "project-shots"
      ? "project-shots"
      : "case-studies";

  const [fullProjects, projectShots] = await Promise.all([
    client.fetch(fullProjectQuery, {}, { cache: "no-store" }),
    client.fetch(projectShotsQuery, {}, { cache: "no-store" }),
  ]);

  return (
    <section>
      <Header variant="project-shots" />
      <div className="relative pb-20 md:mt-0">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <ShuffleButtons activeView={activeView} />
          <div className="hidden md:block">
            <WorkTogetherLink />
          </div>
        </div>

        {activeView === "case-studies" ? (
          <CaseStudies fullProjects={fullProjects} />
        ) : (
          <ProjectShotsGrid shots={projectShots} />
        )}

        <div className="pointer-events-none fixed bottom-7 hidden px-6 lg:block">
          <div className="pointer-events-auto">
            <ContactModal />
          </div>
        </div>
      </div>
    </section>
  );
}

const BentoImage = ({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) => (
  <div className={`relative min-h-0 overflow-hidden ${className}`}>
    <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
  </div>
);

const CaseStudies = ({ fullProjects }: { fullProjects: fullProjectData }) => {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 p-6 lg:grid-cols-2">
      {fullProjects.map((project, index) => {
        const href = project.slug?.current
          ? `/project-detail/${project.slug.current}`
          : "/project-shots";

        let imageSrc = "/assets/hero-a.png";
        if (project.mainImage) {
          try {
            imageSrc = urlFor(project.mainImage).url();
          } catch {
            imageSrc = "/assets/hero-a.png";
          }
        }

        return (
          <Link href={href} key={`${project._id}-${index}`} className="">
            <div className="relative h-[242px] overflow-hidden lg:h-[458px]">
              <Image
                src={imageSrc}
                alt={project.title ?? "Project"}
                fill
                className="object-cover"
              />
            </div>

            <div className="mb-7 flex h-15.5 flex-col justify-center gap-4 pr-4 pl-2 lg:mb-0 lg:flex-row lg:items-end">
              <div className="h-[46px]">
                <h3 className="text text-center">{project.title}</h3>
                <p className="text text-center font-normal text-[#8E8E93]">
                  {project?.role}
                </p>
                {/* <p className="text text-[#8E8E93]">
                  {project.categories
                    ?.map((category) => category.title)
                    .join(" • ")}
                </p> */}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export const menuLinks: { label: string; href: string }[] = [
  {
    label: "Shop",
    href: "/",
  },
  {
    label: "Articles",
    href: "/articles",
  },
  {
    label: "About",
    href: "/about",
  },
];
