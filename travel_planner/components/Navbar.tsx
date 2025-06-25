"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { login, logout } from "@/lib/auth-actions";
import { Session } from "next-auth";
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes";

const Navbar = ({ session }: { session: Session | null }) => {
  const {theme, setTheme} = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return (
    <div className=" shadow-md py-4 border-b">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href={"/"} className="flex items-center gap-x-2">
          <Image src={theme === "dark" ? "/map-pin-light.svg" : "/map-pin-dark.svg"} alt="logo.svg" width={40} height={40} />
          <span className="text-2xl font-bold">PlanMyTrip</span>
        </Link>


        <div className="flex items-center space-x-4">
          <Button variant={"ghost"} onClick={toggleTheme}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon/>}
          </Button>
          {session ? (
            <>
              <Link
                href={"/trips"}
              >
                <Button variant={"ghost"}>My Trips</Button>
              </Link>
              <Link
                href={"/globe"}
              >
                <Button variant={"ghost"}>Globe</Button>
              </Link>
              <Button onClick={logout}>Sign Out</Button>
            </>
          ) : (
            <>
              <Button onClick={login}>Sign In</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
