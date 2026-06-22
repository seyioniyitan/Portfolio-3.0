import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),

    defineField({
      name: "headline",
      title: "Headline",
      type: "text",
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "headline",
    },
  },
});
