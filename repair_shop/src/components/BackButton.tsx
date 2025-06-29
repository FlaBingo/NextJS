"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ButtonHTMLAttributes } from "react";

type Props = {
  title: string,
  className?: string,
  variant?: "default" | "destructive" | "ouline" | "secondary" | "ghost" | "link" | null | undefined,
} & ButtonHTMLAttributes<HTMLButtonElement>

export function BackButton({ title, variant, className, ...props}: Props){
  const router = useRouter();
}