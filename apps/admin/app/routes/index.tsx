import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { prisma } from "@/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import type { User } from "@prisma/client";

type LoaderData = {
  users: User[];
};

export const loader: LoaderFunction = async () => {
  const users = await prisma.user.findMany();
  return json<LoaderData>({ users });
};

export default function Index() {
  const { users } = useLoaderData<LoaderData>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} | {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
