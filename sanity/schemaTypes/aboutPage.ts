import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: "introOne",
      title: "Introduction Paragraph 1",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "introTwo",
      title: "Paragraph 2",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "introThree",
      title: "Paragraph 3",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "introFour",
      title: "Paragraph 4",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "contactDetails",
      title: "Contact Details",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "imageOne",
      title: "First Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "imageTwo",
      title: "Second Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "About Page",
      };
    },
  },
});
