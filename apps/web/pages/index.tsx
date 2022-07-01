import { prisma, User } from "@turbyo/api";
import { Button } from "@turbyo/ui";
import { GetServerSideProps } from "next";
import Link from "next/link";

type Props = {
  users: User[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const users = await prisma.user.findMany();

  return {
    props: { users },
  };
};

export default function Web({ users }: Props) {
  return (
    <div>
      <h1>Web</h1>
      <Button />
      <Link href="/another">Go to another page</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
