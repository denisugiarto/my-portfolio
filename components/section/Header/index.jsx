import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { PhoneIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import data from "../../../constant/data.json";
import Image from "next/image";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ activeNavbar }) {
  return (
    <header>
      <Disclosure
        as="nav"
        className="sticky top-0 z-10 border-b border-secondary bg-secondary shadow-xl"
      >
        {({ open }) => (
          <Disclosure>
            <div className="container py-2">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link
                      href="/"
                      className="rounded border border-transparent p-1 font-title text-4xl  transition duration-300 hover:border-black hover:bg-gray-100"
                      title={data.profile.name}
                    >
                      DS
                    </Link>
                  </div>
                  <div className="my-auto hidden font-body sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {data.navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            activeNavbar === item.href
                              ? "bg-primary text-white shadow-2xl"
                              : "text-gray-900 hover:bg-primary hover:text-white",
                            "rounded-xl px-3 py-2 font-extrabold",
                          )}
                          aria-current={item.active ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-1 sm:block">
                  <a
                    href={
                      data.contact.filter((item) => {
                        return item.type === "whatsapp";
                      })[0].link
                    }
                    className="font-serif absolute inset-y-0 right-0 flex transform items-center justify-center rounded-xl border-2 border-primary px-4 py-2 font-bold capitalize text-primary duration-300 hover:scale-110 hover:bg-primary hover:text-white sm:static"
                  >
                    let&apos;s Connect
                  </a>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {data.navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      activeNavbar === item.href
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block cursor-pointer rounded-xl px-3 py-2 text-base font-medium",
                    )}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Disclosure>
        )}
      </Disclosure>
    </header>
  );
}
