import type { HeadersFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link as NextLink, useLoaderData } from "@remix-run/react";

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") || "no-cache",
});

export function loader() {
  const dateTime = new Date();

  return json(
    { dateTime },
    {
      headers: {
        "Cache-Control": "max-age=10, s-maxage=10, stale-while-revalidate",
      },
    }
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Wassup im index hehe XD</p>
      <NextLink to=".">Refresh</NextLink>
      <time dateTime={data.dateTime}>
        {new Date(data.dateTime).toLocaleString("en-AU", {
          dateStyle: "medium",
          timeStyle: "medium",
        })}
      </time>
    </div>
  );
}
