import {
  useLocation,
  useNavigate,
  useSearchParams as useRrSearchParams,
} from "react-router"

export function usePathname() {
  return useLocation().pathname
}

export function useRouter() {
  const navigate = useNavigate()
  return {
    push: (href: string) => navigate(href),
    replace: (href: string) => navigate(href, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => window.location.reload(),
  }
}

export function useSearchParams() {
  const [searchParams] = useRrSearchParams()
  return searchParams
}
