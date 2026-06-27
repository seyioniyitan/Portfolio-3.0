import { groq } from "next-sanity";

export const projectShotsQuery = groq`
  *[
    _type == "projectShots" &&
    (!defined(hidden) || hidden == false)
  ]
  | order(_createdAt desc) {
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
  *[_type == "fullProject"] | order(_createdAt desc) {
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
    tag,
    image {
      alt,
      asset
    }
  }
`;
