import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const artPieceType = defineType({
  name: "artPieces",
  title: "Art Pieces",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "header",
      type: "string",
    }),
    defineField({
      name: "link",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
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
      name: "body",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "header",
      author: "author.name",
      media: "image",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
