"use client";
import { signIn } from "next-auth/react";
import { Comments } from "@fuma-comment/react";

export function CommentsWithAuth({ page }: { page: string }) {
  return (
    <Comments
      auth={{
        type: 'api',
        signIn: () => void signIn("github"),
      }}
      className="mt-4 -mx-6 sm:-mx-3 overflow-hidden"
      page={page}
    />
  );
}
