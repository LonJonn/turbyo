import type { HeadersFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { prisma } from "@turbyo/api";
import type { User } from "@turbyo/api";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { FilterIcon, SearchIcon } from "@heroicons/react/solid";

export type LoaderData = {
  users: User[];
};

export const loader: LoaderFunction = async () => {
  const users = await prisma.user.findMany();

  return json<LoaderData>(
    { users },
    { headers: { "Cache-Control": "s-maxage=1, stale-while-revalidate" } }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") || "",
});

export default function Users() {
  const { users } = useLoaderData<LoaderData>();

  const people = users.map((user) => ({
    id: user.id,
    name: user.name,
    role: "Full-stack Developer",
    imageUrl: AVATARS_STUB[user.id % AVATARS_STUB.length],
  }));

  return (
    <>
      <main className="grow overflow-y-auto xl:order-last">
        <Outlet />
      </main>

      <aside className="hidden w-96 shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
        {/* Search */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-medium text-gray-900">Directory</h2>
          <p className="mt-1 text-sm text-gray-600">
            Search directory of {users.length} employees
          </p>
          <form className="mt-6 flex space-x-4" action="#">
            <div className="min-w-0 flex-1">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  placeholder="Search"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <FilterIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>

        {/* Directory list */}
        <nav className="flex min-h-0 grow flex-col" aria-label="Directory">
          <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
            <h3>Users</h3>
          </div>

          <ul className="grow divide-y divide-gray-200 overflow-y-auto">
            {people.map((person) => (
              <li key={person.id}>
                <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={person.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link to={`./${person.id}`} className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {person.name}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {person.role}
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

const AVATARS_STUB = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
];
