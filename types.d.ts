export type HomePageData = {
  hero: {
    _id: string;
    name: string;
    headline: string;
    tagline?: string;
  } | null;

  projects: {
    _id: string;
    title: string;
    link?: string;
    body?: string;
    image?: {
      asset: {
        url: string;
      };
    };
  }[];
};
