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

export type ProjectDetail = {
  _id: string;
  title?: string;
  link?: string;
  role?: string;
  slug?: {
    current: string;
  };
  publishedAt?: string;
  body?: PortableTextBlock[];
  mainImage?: {
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

export type AboutPageData = {
  _id: string;
  introOne?: string;
  introTwo?: string;

  contactDetails?: {
    label: string;
    value: string;
  }[];

  imageOne?: {
    alt?: string;
    asset: {
      _ref: string;
    };
  };

  imageTwo?: {
    alt?: string;
    asset: {
      _ref: string;
    };
  };
};
