import type { HeadersFunction } from "@remix-run/node";

export const headers: HeadersFunction = ({ parentHeaders }) => ({
  "Cache-Control": parentHeaders.get("Cache-Control") || "",
});

export default function UsersIndex() {
  return (
    <div className="mt-[20vh]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Select a user to get started
        </h1>
        <p className="text-gray-500">Or create another in the database.</p>
      </div>
    </div>
  );
}
