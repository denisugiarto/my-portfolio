import { defineConfig } from "sanity";
import { markdownSchema } from "sanity-plugin-markdown";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dmdxpdxy";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "My Portfolio",

  projectId,
  dataset,

  plugins: [structureTool(), markdownSchema()],

  schema: {
    types: schemaTypes,
  },

  basePath: "/studio",
});
