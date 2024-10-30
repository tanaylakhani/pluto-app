"use client";

import { User } from "@/lib/db/schema";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { instance } from "./axios";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
  let context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function UserProvider({ children }: { children: ReactNode }) {
  let [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await instance.get("/user");
      if (res?.status !== 201) {
        setUser(null);
        setLoading(false);
        return;
      }
      const data = res?.data?.data as User;
      setUser(data);
      setLoading(false);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading: loading }}>
      {children}
    </UserContext.Provider>
  );
}
