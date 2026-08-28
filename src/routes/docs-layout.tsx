import { Outlet } from "react-router"

export default function DocsLayout() {
  return (
    <>
      <div className="mx-auto h-12 border-x border-line md:max-w-3xl" />
      <Outlet />
    </>
  )
}
