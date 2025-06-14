import { currentUser } from "@clerk/nextjs/server";
import { ThemeToggle } from "./themeToggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { HomeIcon, BellIcon, UserIcon } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/nextjs";

async function DesktopNavbar() {
  const user = await currentUser();
  // console.log("hello my name is, ", user)
  return (
    <div className="hidden md:flex items-center space-x-4">
      <ThemeToggle />
      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href={"/"}>
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant={"ghost"} className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notification</span>
            </Link>
          </Button>
          <Button variant={"ghost"} className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ??
                user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4"/>
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
