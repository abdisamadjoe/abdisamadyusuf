import { Outlet } from "react-router"

export default function PagesLayout() {
  return (
    <div className="mx-auto border-x border-line pt-12 md:max-w-3xl">
      <Outlet />
    </div>
  )
}
