import { type SchemaTypeDefinition } from "sanity";
import { hero } from "../schemas/hero";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero],
};
