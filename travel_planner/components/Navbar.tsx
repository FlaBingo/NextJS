"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { login } from "@/lib/auth-actions";
import { Session } from "next-auth";

const Navbar = ({session}: {session: Session | null}) => {
  return (
    <div className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href={"/"} className="flex items-center gap-x-2">
          <Image src={"/map-pin.svg"} alt="logo.svg" width={40} height={40}/>
          <span className="text-2xl font-bold text-gray-800">PlanMyTrip</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href={"/trips"} className="text-slate-900 hover:text-sky-500">
            <Button variant={"ghost"}>
              My Trips
            </Button>
          </Link>
          <Link href={"/globe"} className="text-slate-900 hover:text-sky-500">
            <Button variant={"ghost"}>
              Globe
            </Button>
          </Link>

          <Button onClick={login}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
