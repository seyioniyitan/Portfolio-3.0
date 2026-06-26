import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "2nvzfdqm",
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: "2025-01-01",
  useCdn: true,
});
