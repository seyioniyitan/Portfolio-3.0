import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { artPieceType } from "./artPieceType";
import { porjectShotsType } from "./projectShotsTypes";
import { fullProjectType } from "./fullProjectType";
import { hero } from "./hero";
import { recentWork } from "./recentWork";
import { aboutPageType } from "./aboutPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    artPieceType,
    porjectShotsType,
    fullProjectType,
    hero,
    recentWork,
    aboutPageType,
  ],
};
