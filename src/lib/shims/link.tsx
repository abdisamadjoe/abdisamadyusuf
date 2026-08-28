import React from "react"
import { Link } from "react-router"

export interface LinkProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "to"
> {
  href: string | any
  replace?: boolean
  scroll?: boolean
  prefetch?: any
}

const NextLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, replace, scroll, prefetch, ...props }, ref) => {
    return <Link ref={ref} to={href} replace={replace} {...props} />
  }
)

NextLink.displayName = "NextLink"

export default NextLink
