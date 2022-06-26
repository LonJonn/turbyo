import type { HeadersFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const headers: HeadersFunction = ({ parentHeaders }) => ({
  "Cache-Control": parentHeaders.get("Cache-Control") || "",
});

export const loader: LoaderFunction = async () => {
  return redirect("/users");
};
