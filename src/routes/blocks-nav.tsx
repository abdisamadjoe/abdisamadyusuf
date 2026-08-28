import { Link, useLocation } from "react-router"

import type { NavItem } from "@/types/nav"
import { blockCategories } from "@/config/registry"

const NAV_ITEMS: NavItem[] = [
  {
    href: "/blocks",
    title: "All",
  },
  ...blockCategories.map((category) => ({
    href: `/blocks/${category.name}`,
    title: category.title,
  })),
]

export function BlocksNav() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className="no-scrollbar scroll-fade-x overflow-x-auto">
      <nav className="flex w-max items-center pr-2 whitespace-nowrap">
        {NAV_ITEMS.map(({ href, title }) => (
          <Link
            key={href}
            to={href}
            aria-current={href === pathname ? "page" : undefined}
            className="border-r border-line p-4 font-mono text-[.8125rem]/4 font-medium tracking-wide text-muted-foreground uppercase transition-[color,background-color] ease-out hover:bg-accent-muted aria-[current=page]:bg-accent-muted aria-[current=page]:text-foreground"
          >
            {title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
