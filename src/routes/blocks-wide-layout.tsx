import { Outlet } from "react-router"

export default function BlocksWideLayout() {
  return (
    <div
      data-slot="layout-wide"
      className="container mx-auto border-x border-line pt-12"
    >
      <Outlet />
    </div>
  )
}
