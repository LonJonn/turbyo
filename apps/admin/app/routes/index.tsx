import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader() {
  const dateTime = new Date();
  return json(
    { dateTime },
    { headers: { "Cache-Control": "s-maxage=5, stale-while-revalidate" } }
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Wassup im index hehe XD</p>
      <time dateTime={data.dateTime}>
        {new Date(data.dateTime).toLocaleString("en-AU", {
          dateStyle: "medium",
          timeStyle: "medium",
        })}
      </time>
    </div>
  );
}
