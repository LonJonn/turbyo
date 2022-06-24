import { Button } from "@turbyo/ui";
import Link from "next/link";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Button />
      <Link href="/another">Go to another page</Link>
    </div>
  );
}
