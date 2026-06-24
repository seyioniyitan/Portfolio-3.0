// export const apiVersion =
//   process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-15";

// export const dataset = assertValue(
//   process.env.SANITY_STUDIO_DATASET,
//   "Missing environment variable: SANITY_STUDIO_DATASET",
// );

// export const projectId = assertValue(
//   process.env.SANITY_STUDIO_PROJECT_ID,
//   "Missing environment variable: SANITY_STUDIO_PROJECT_ID",
// );

// function assertValue<T>(v: T | undefined, errorMessage: string): T {
//   if (v === undefined) {
//     throw new Error(errorMessage);
//   }

//   return v;
// }

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-25";

export const dataset = assertValue(
  "production",
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  "2nvzfdqm",
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
