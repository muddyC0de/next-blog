// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import type { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      fullName: string;
      username: string;
      id: string;
      role: UserRole;
      image: string;
    };
  }

  interface User extends DefaultUser {
    username: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    username: string;
    role: UserRole;
  }
}
