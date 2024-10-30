import { NewUser, users, Workspace } from "@/lib/db/schema";
import { compare, hash } from "bcryptjs";
import { getCookie, setCookie } from "cookies-next";
import { and, eq, isNull } from "drizzle-orm";
import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";
import { db } from "./db/drizzle";
import { getUserWorkspaces } from "./db/workspaces";
import { getAvatarByUserInitials } from "./utils";
import { NextRequest } from "next/server";

const key = new TextEncoder().encode(process.env.NEXT_PUBLIC_AUTH_SECRET);
const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
) {
  return compare(plainTextPassword, hashedPassword);
}

export type SessionData = {
  user: NewUser;
  expires: string;
};

export async function signToken(payload: SessionData | Workspace) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
  return token;
}

export async function verifyJWTPayload(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export const getUserFromCookies = async (req: NextRequest) => {
  const cookie = req.cookies.get("session");
  if (!cookie) {
    return null;
  }
  return (await verifyToken(cookie?.value!)) as SessionData;
};

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as SessionData | Workspace;
}

export async function getSession() {
  const session = getCookie("session");
  if (!session) {
    return null;
  }
  return await verifyToken(session! as string);
}

export async function setSession(user: NewUser) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session: SessionData = {
    user: user,
    expires: expiresInOneDay.toISOString(),
  };
  const encryptedSession = await signToken(session);
  setCookie("session", encryptedSession);
}

const systemPrompt = `You are a flashcard generator. You generate flashcards based on the context provided by the user.
- Context will be provided in markdown format.
- Context will be provided inside of <context></context> tag.
- Generate minimum of 5 flashcards and maximum of 10 flashcards.

`;

// Auth actions

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const RegisterSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(6),
});

export const login = async (payload: z.infer<typeof LoginSchema>) => {
  const { success, data, error } = LoginSchema.safeParse(payload);
  if (!success) {
    return {
      data: { user: null, workspaces: null },
      error: error?.errors[0]?.message,
    };
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.email, data?.email), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return {
      data: { user: null, workspaces: null },
      error: `User with email ${data.email} not found`,
    };
  }

  console.log({ user });

  const isValid = await comparePasswords(data.password, user[0]!.passwordHash!);
  if (!isValid) {
    return {
      data: { user: null, workspaces: null },
      error: "Invalid email or password",
    };
  }
  await setSession(user[0]!);

  const workspaces = await getUserWorkspaces(user[0]!.id!);
  if (workspaces.length === 0) {
    return { data: { user: user[0], workspaces: null }, error: null };
  }
  setActiveWorkspace(workspaces[0]);

  return { data: { user: user[0], workspaces: workspaces }, error: null };
};

export const register = async (payload: z.infer<typeof RegisterSchema>) => {
  const { email, name, password } = payload;
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  console.log({ existingUser });
  if (existingUser.length > 0) {
    return { data: null, error: "Failed to create user. Please try again." };
  }
  const passwordHash = await hashPassword(password);
  const avatar = getAvatarByUserInitials(name);
  console.log({ passwordHash, avatar });
  const newUser: NewUser = {
    image: avatar || null,
    name,
    email,
    passwordHash,
    role: "owner", // Default role, will be overridden if there's an invitation
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();
  console.log({ createdUser });
  if (!createdUser) {
    return { data: null, error: "Failed to create user. Please try again." };
  }
  return { data: createdUser, error: null };
};

export // Workspace actions
const getActiveWorkspace = async () => {
  const activeWorkspace = getCookie("active-workspace");
  return activeWorkspace
    ? ((await verifyToken(activeWorkspace)) as Workspace)
    : null;
};
export const setActiveWorkspace = async (payload: Workspace) => {
  const encryptedWorkspace = await signToken(payload);
  setCookie("active-workspace", encryptedWorkspace);
};

// Collection actions
// Document actions
