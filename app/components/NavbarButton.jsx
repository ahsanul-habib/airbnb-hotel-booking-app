"use client";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import doSignOut from "../actions/auth/signOut";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavbarButton = ({ user }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const navRef = useRef(null);

  const redirectTo = (path) => {
    setIsNavOpen(false);
    router.push(path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center"
      >
        <GiHamburgerMenu />
        <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
          {user?.user?.image ? (
            <Image
              alt={user.user.name}
              src={user.user.image}
              width={24}
              height={24}
              className="rounded-full"
            ></Image>
          ) : (
            <FaUser />
          )}
        </span>
      </button>
      {isNavOpen && (
        <div ref={navRef} className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50 block">
          <ul className="flex flex-col">
            {user ? (
              <>
                <button onClick={async () => await doSignOut()}>
                  <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    Logout
                  </li>
                </button>
                <button onClick={() => redirectTo("/hotel/create")}>
                  <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    Create hotel
                  </li>
                </button>
                <button onClick={() => redirectTo("/hotel/manage")}>
                  <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    Manage hotel
                  </li>
                </button>
                <button onClick={() => redirectTo("/hotel/bookings")}>
                  <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    Manage bookings
                  </li>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => redirectTo("/login")} className="w-full">
                  <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    Login
                  </li>
                </button>
                <button
                  onClick={() => redirectTo("/signup")}
                  className="w-full"
                >
                  <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    Signup
                  </li>
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavbarButton;
