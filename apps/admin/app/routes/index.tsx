import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader() {
  const dateTime = new Date();
  return json(dateTime, {
    headers: { "Cache-Control": "s-maxage=5, stale-while-revalidate=5" },
  });
}

export default function Index() {
  const dateTime = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Wassup im index hehe XD</p>
      <time dateTime={dateTime}>
        {new Date(dateTime).toLocaleString("en-AU", {
          dateStyle: "medium",
          timeStyle: "medium",
        })}
      </time>
    </div>
  );
}
