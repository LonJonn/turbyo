import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css";

import { Fragment, Suspense, useState } from "react";
import { classNames } from "@/utils/classnames";
import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full overflow-hidden">
        <MainLayout>
          <Outlet />
        </MainLayout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

/** Internal components */

//#region Data

const user = {
  name: "Leon Salsiccia",
  imageUrl:
    "https://lh3.googleusercontent.com/ogw/ADea4I7xaNL6XQmOryyV9kv2pi8dMicQtDVkpbgTrww5KA=s32-c-mo",
};

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Teams", href: "#", icon: UserGroupIcon, current: false },
  { name: "Directory", href: "#", icon: SearchCircleIcon, current: true },
  { name: "Announcements", href: "#", icon: SpeakerphoneIcon, current: false },
  { name: "Office Map", href: "#", icon: MapIcon, current: false },
];

const secondaryNavigation = [
  { name: "Apps", href: "#", icon: ViewGridAddIcon },
  { name: "Settings", href: "#", icon: CogIcon },
];

//#endregion

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setSidebarOpen}
        >
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900/50 backdrop-blur-md" />
          </Transition.Child>

          {/* Slide-out */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs">
              {/* Close button */}
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>

              <Sidebar />
            </div>
          </Transition.Child>

          {/* Force sidebar to shrink to fit close icon */}
          <div className="w-14 flex-shrink-0" aria-hidden="true" />
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden w-64 lg:flex lg:shrink-0">
        <Sidebar />
      </div>

      {/* Mobile header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5 lg:hidden">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-pink-500.svg"
          alt="Workflow"
        />

        <button
          type="button"
          className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Content */}
      <div className="flex grow overflow-hidden">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex min-h-0 grow flex-col border-r border-gray-200 bg-gray-100">
      {/* Logo */}
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg"
            alt="Workflow"
          />
        </div>

        {/* Nav */}
        <nav className="mt-5 flex-1" aria-label="Sidebar">
          <div className="space-y-1 px-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 h-6 w-6 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </div>
          <hr className="my-5 border-t border-gray-200" aria-hidden="true" />
          <div className="flex-1 space-y-1 px-2">
            {secondaryNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon
                  className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* User */}
      <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
        <a href="#" className="group block w-full flex-shrink-0">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={user.imageUrl}
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {user.name}
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                View profile
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
