import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { users } from "./schema";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user[0]) throw new Error("User not found");

    return { data: user[0], error: null };
  } catch (error: any) {
    return { data: null, error: (error as Error).message };
  }
};
