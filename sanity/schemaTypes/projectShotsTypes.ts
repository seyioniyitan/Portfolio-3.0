import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectShotsType = defineType({
  name: "projectShots",
  title: "Project shots",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),

    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),

    defineField({
      name: "categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "category" },
        }),
      ],
    }),

    defineField({
      name: "hidden",
      title: "Hide from website",
      description:
        "When enabled, this project shot will not be returned in queries.",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      hidden: "hidden",
    },
    prepare({ title, media, hidden }) {
      return {
        title,
        media,
        subtitle: hidden ? "Hidden from website" : "Visible on website",
      };
    },
  },
});
