import { z } from "zod";

export const schemaEditProfile = z.object({
  name: z.string().min(1, "Must be at least 1 character long"),
  profilePicture: z.instanceof(File).nullable(),
});
export type SchemaEditProfile = z.infer<typeof schemaEditProfile>;
