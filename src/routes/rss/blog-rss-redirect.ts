import { redirect } from "react-router"

export function loader() {
  return redirect("/blog/rss", { status: 301 })
}
