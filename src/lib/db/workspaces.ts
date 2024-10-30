import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { workspaces } from "./schema";

export const getUserWorkspaces = async (user: string) => {
  if (!user) {
    throw new Error("USER-WORKSPACES: User not found");
  }
  const userWorkspaces = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces?.user, user));

  // console.log({ userWorkspaces });

  return userWorkspaces;
};
