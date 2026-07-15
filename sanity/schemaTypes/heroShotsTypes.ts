import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const heroShotsType = defineType({
  name: "heroShots",
  title: "Hero shots",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),

    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description:
        "Controls the order hero shots appear in the homepage slider (ascending).",
      validation: (Rule) => Rule.integer().positive(),
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
      validation: (Rule) => Rule.required(),
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
        "When enabled, this hero shot will not be returned in queries.",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      hidden: "hidden",
      order: "order",
    },
    prepare({ title, media, hidden, order }) {
      const orderLabel =
        typeof order === "number" ? `Order ${order}` : "No order set";
      return {
        title,
        media,
        subtitle: hidden ? "Hidden from website" : orderLabel,
      };
    },
  },
});
