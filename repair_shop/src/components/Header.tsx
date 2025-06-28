import { HomeIcon, File, UsersRound } from "lucide-react";
import { NavButton } from "./NavButton";
import Link from "next/link";
import { ModeToggle } from "./ThemeButton";

export function Header() {
  return (
    <header
      className="animate-slide h-12 p-2 border-b sticky
     top-0 z-20"
    >
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/home" icon={HomeIcon} />
          <Link
            href={"/home"}
            title="Home"
            className="flex justify-center gap-2 ml-0"
          >
            <h1 className="hidden sm:block font-bold">Computer Repair Shop</h1>
          </Link>
        </div>

        <div className="flex items-center">
          <ModeToggle />
          <NavButton href="/tickets" label="Tickets" icon={File} />
          <NavButton href="/customers" label="Customers" icon={UsersRound} />
        </div>
      </div>
    </header>
  );
}
