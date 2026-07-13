import { MetadataRoute } from "next";
import { SanityProjectSlug } from "@/types";
import { client } from "@/sanity/lib/client";
import { sitemapProjectsQuery } from "./lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://seyioniyitan.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/project-shots`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  try {
    // 3. Fetch the live array of project slugs from Sanity content lake
    const projects: SanityProjectSlug[] =
      await client.fetch(sitemapProjectsQuery);

    const dynamicProjectPages: MetadataRoute.Sitemap = projects.map(
      (project) => {
        const lastModDate =
          project._updatedAt || project.publishedAt || new Date();

        return {
          url: `${baseUrl}/project-detail/${project.slug}`,
          lastModified: new Date(lastModDate),
          changeFrequency: "monthly",
          priority: 0.7, // Sets high visibility for individual case studies
        };
      },
    );

    return [...staticPages, ...dynamicProjectPages];
  } catch (error) {
    console.error("Error generating dynamic sitemap from Sanity:", error);
    return staticPages;
  }
}
