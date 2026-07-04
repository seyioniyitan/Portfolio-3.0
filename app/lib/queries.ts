import { groq } from "next-sanity";

/**
 * Minimal query to collect all published project slugs.
 * Used by generateStaticParams to pre-render project detail pages at build time.
 */
export const projectSlugsQuery = groq`
  *[_type == "fullProject" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const projectShotsQuery = groq`
  *[
    _type == "projectShots" &&
    (!defined(hidden) || hidden == false)
  ]
  | order(_createdAt asc) {
    _id,
    title,
    hidden,
    image {
      alt,
      asset
    },
    categories[]->{
      _id,
      title
    }
  }
`;

export const heroQuery = groq`
  *[_type == "hero"][0]{
    _id,
    name,
    headline,
    tagline
  }
`;

export const fullProjectQuery = groq`
  *[_type == "fullProject"] | order(_updatedAt desc) {
    ..., body
  }
`;

export const fullProjectBySlugQuery = groq`
  *[
    _type == "fullProject" &&
    slug.current == $slug
  ][0]{
    _id,
    title,
    role,
    slug,
    publishedAt,

    bodyOne,
    bodyTwo,

    mainImage {
      alt,
      asset
    },

    categories[]->{
      _id,
      title
    },

    links[]{
      title,
      url
    }
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    _id,
    introOne,
    introTwo,
    introThree,
    introFour,

    contactDetails,

    imageOne{
      alt,
      asset
    },

    imageTwo{
      alt,
      asset
    }
  }
`;

export const recentWorkQuery = groq`
  *[_type == "recentWork"] | order(_createdAt asc) {
    _id,
    company,
    role,
    year,
    link,
    tag,
    image {
      alt,
      asset
    }
  }
`;

export const animationSliderQuery = groq`
  *[_type == "animationSlider"] | order(_createdAt asc) {
    _id,
    alt,
    width,
    height,
    rotate,
    image {
      alt,
      asset
    }
  }
`;
