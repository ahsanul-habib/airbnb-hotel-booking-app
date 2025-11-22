import { auth } from "@/auth";
import NavbarButton from "./NavbarButton";

export default async function NavbarButtonWrapper() {
    const user = await auth();
    console.log(user);
    return <NavbarButton user={user} />;
  }
  