import React from "react"
import { Link } from "react-router"

import type { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

export function Nav({
  items,
  activeId,
  className,
  exactMatch = false,
}: {
  items: NavItem[]
  activeId?: string
  className?: string
  exactMatch?: boolean
}) {
  return (
    <nav
      data-active-id={activeId}
      className={cn("flex items-center gap-4", className)}
    >
      {items.map(({ title, href }) => {
        const isActive = exactMatch
          ? activeId === href
          : activeId === href ||
            (href === "/" // Home page
              ? ["/", "/index"].includes(activeId || "")
              : activeId?.startsWith(href))

        return (
          <NavItem
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
          >
            {title}
          </NavItem>
        )
      })}
    </nav>
  )
}

export function NavItem({
  className,
  href,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "to"> & { href: string }) {
  return (
    <Link
      to={href}
      className={cn(
        "text-sm font-medium tracking-wide text-muted-foreground transition-[color] hover:text-foreground aria-[current=page]:text-foreground",
        className
      )}
      {...props}
    />
  )
}
