import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const fullProjectType = defineType({
  name: "fullProject",
  title: "Full project",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Projects are displayed in ascending order (1, 2, 3, ...).",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .custom(async (value, context) => {
            if (value === undefined) return true;

            const { document, getClient } = context;

            const client = getClient({ apiVersion: "2025-01-01" });

            const id = document?._id?.replace(/^drafts\./, "");

            const existing = await client.fetch(
              `*[
          _type == "fullProject" &&
          order == $order &&
          !(_id in [$draftId, $publishedId])
        ][0]._id`,
              {
                order: value,
                draftId: `drafts.${id}`,
                publishedId: id,
              },
            );

            return existing
              ? "Another project already uses this display order."
              : true;
          }),
    }),

    defineField({
      name: "role",
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
      name: "mainImage",
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
      name: "publishedAt",
      type: "datetime",
    }),

    defineField({
      name: "bodyOne",
      title: "First Paragraph",
      type: "blockContent",
    }),

    defineField({
      name: "bodyTwo",
      title: "Second Paragraph",
      type: "blockContent",
    }),

    defineField({
      name: "links",
      title: "Links",
      type: "array",
      validation: (Rule) => Rule.max(2),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Button Title",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "url",
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});
