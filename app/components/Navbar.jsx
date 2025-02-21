import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { IoSearchOutline } from "react-icons/io5";
import NavbarButtonWrapper from "./NavbarButtonWrapper";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="grid grid-cols-2 md:flex justify-between items-center h-20 py-3 bg-white border-b md:gap-8 px-4 md:px-8 lg:px-20">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={logo}
            alt="Hotel Logo"
            className="h-8 w-auto"
          />
        </Link>
      </div>
      <SearchBar/>
      <div className="flex items-center space-x-4 relative justify-end">
        <button>
          <i className="fas fa-bars" />
        </button>
        <NavbarButtonWrapper/>
      </div>
    </nav>
  );
}
