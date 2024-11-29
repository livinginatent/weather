import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "70tabj2t",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
