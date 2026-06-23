export type ProjectDetailType = "A" | "B" | "C" | "D" | "E";

export type CaseStudy = {
  id: string;
  type: ProjectDetailType;
  title: string;
  role: string;
  tag: string[];
  image: string;
};

export const caseStudyData: CaseStudy[] = [
  {
    id: "rise-3-0",
    type: "A",
    title: "Rise 3.0",
    role: "Product Design Lead",
    tag: ["Video", "App Store"],
    image: "/assets/hero-a.png",
  },
  {
    id: "alien-ware",
    type: "B",
    title: "Alien Ware",
    role: "Product Design Lead",
    tag: ["Website", "Case Study"],
    image: "/assets/hero-b.png",
  },
  {
    id: "nebula-launch",
    type: "C",
    title: "Nebula Launch",
    role: "Product Design Lead",
    tag: ["Marketing", "Interactive"],
    image: "/assets/hero-b.png",
  },
  {
    id: "massive-grid",
    type: "D",
    title: "Massive Grid",
    role: "Product Design Lead",
    tag: ["Brand", "UI/UX"],
    image: "/assets/hero-a.png",
  },
  {
    id: "echo-platform",
    type: "E",
    title: "Echo Platform",
    role: "Product Design Lead",
    tag: ["System", "Product"],
    image: "/assets/hero-b.png",
  },
];
