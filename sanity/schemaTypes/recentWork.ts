import { defineField, defineType } from "sanity";

export const recentWork = defineType({
  name: "recentWork",
  title: "Recent Work",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company / Project",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: 'Use values like "2026", "2025", or "Continuous".',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      description: 'Optional label such as "WIP".',
    }),

    defineField({
      name: "link",
      title: "Link",
      type: "string",
      description: "Optional URL to the company, project, or case study.",
    }),

    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "company",
      subtitle: "role",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
