import { redirect } from "react-router"

export function loader() {
  return redirect("/components/rss", { status: 301 })
}
