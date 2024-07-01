"use client";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { Comments, AuthProvider } from "@fuma-comment/react";
import type { ReactNode } from "react";

export function CommentsWithAuth({ page }: { page: string }) {
  return (
    <SessionProvider>
      <Auth>
        <Comments className="mt-4 -mx-6 sm:-mx-3" page={page} />
      </Auth>
    </SessionProvider>
  );
}

function Auth(props: { children: ReactNode }) {
  const session = useSession();
  const id = session.data?.user?.email;

  return (
    <AuthProvider
      session={id ? { id } : null}
      signIn={() => void signIn("github")}
      status={session.status}
    >
      {props.children}
    </AuthProvider>
  );
}
