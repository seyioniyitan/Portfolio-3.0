import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const animationSlider = defineType({
  name: "animationSlider",
  title: "Animation Slider",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "slide",
      title: "Slide Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Image Alt Text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "width",
      title: "Width",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),

    defineField({
      name: "height",
      title: "Height",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),

    defineField({
      name: "rotate",
      title: "Rotation (degrees)",
      type: "number",
      description: "Positive or negative rotation value.",
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: "slide",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      };
    },
  },
});
