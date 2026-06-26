export type HomePageData = {
  hero: {
    _id: string;
    name: string;
    headline: string;
    tagline?: string;
  } | null;
};

export type ProjectShot = {
  _id: string;
  title: string;
  image?: {
    alt?: string;
    asset: {
      _ref: string;
    };
  };
  categories?: {
    _id: string;
    title: string;
  }[];
};

export type fullProjectData = {
  _id: string;
  title?: string;
  role?: string;
  link?: string;
  slug?: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  categories?: {
    _id: string;
    title: string;
  }[];
  publishedAt?: string;
  body?: unknown;
}[];
