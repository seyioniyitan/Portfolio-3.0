import { groq } from "next-sanity";

export const projectShotsQuery = groq`
  *[_type == "projectShots"] | order(_createdAt desc) {
    _id,
    title,
    link,
    body,
    image{
      asset->{
        url
      }
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
