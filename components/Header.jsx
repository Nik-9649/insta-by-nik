import Image from "next/image";
import { Bars3Icon, HomeIcon } from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  HeartIcon,
  PlusCircleIcon,
  PlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            objectFit="contain"
            layout="fill"
          />
        </div>

        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm"
            objectFit="contain"
            layout="fill"
          />
        </div>

        {/* Middle */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              {/* SearchIcon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              className="bg-[#EFEFEF] block w-full m-2 pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}
        {/* Home Icon */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          <Bars3Icon className="h-6 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative navBtn">
                {/* Dm Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="navBtn"
                >
                  <path d="M49.991 2.5c-45.364-.022-62.7 52.324-31.772 81.859-.001.001.25 8.203.25 8.203.01 3.493 3.979 5.993 7.132 4.496l9.146-4.034c73.626 16.469 86.94-87.356 15.244-90.524zm0 89.439c-4.473 0-8.84-.579-12.982-1.723a5.09 5.09 0 00-3.387.256l-9.143 4.033c-1.424.677-3.224-.451-3.223-2.031l-.251-8.208a5.08 5.08 0 00-1.707-3.614C-9.869 53.921 9.114 4.536 49.992 5.289c59.327.746 59.322 85.91-.001 86.65z" />
                  <path d="M73.655 34.275L59.113 45.311a1.365 1.365 0 01-1.652.007l-10.77-8.08c-3.709-2.908-9.589-1.821-12.015 2.219-.949 1.572 1.354 3.02 2.358 1.487 1.608-2.689 5.529-3.414 7.986-1.471l10.768 8.078a4.188 4.188 0 005.008-.015l14.546-11.039c.766-.569 1.62.358 1.148 1.059L62.948 59.039c-1.609 2.686-5.519 3.414-7.984 1.473l-10.772-8.081a4.193 4.193 0 00-5.008.015L24.64 63.487c-.752.559-1.624-.34-1.149-1.059l9.797-15.541c.957-1.564-1.361-3.022-2.358-1.487l-9.794 15.536c-2.146 3.307 2.071 7.194 5.192 4.771L40.869 54.67a1.367 1.367 0 011.654-.006l10.769 8.079c3.706 2.908 9.59 1.82 12.016-2.217l13.541-21.48c2.139-3.305-2.066-7.193-5.194-4.771z" />
                </svg>
                <div className="absolute -top-2 text-sm h-5 w-5 -right-3 text-white bg-red-600 rounded-full flex items-center justify-center">
                  3
                </div>
              </div>
              <PlusIcon className="navBtn border border-black rounded-md" />
              <UserGroupIcon className="navBtn rounded-full" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                loading="lazy"
                className="h-6 w-6 cursor-pointer rounded-full"
                src={session?.user?.image}
                alt={session?.user?.name}
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
