import { groq } from "next-sanity";

export const projectShotsQuery = groq`
  *[_type == "projectShots"] | order(_createdAt desc) {
    _id,
    title,
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
