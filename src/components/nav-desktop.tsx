"use client"

import { usePathname } from "next/navigation"

import type { NavItem } from "@/types/nav"
import { Nav } from "@/components/nav"

export function NavDesktop({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return <Nav className="max-sm:hidden" items={items} activeId={pathname} />
}
