import { Outlet } from "react-router"

import "dialkit/styles.css"

import { DialRoot } from "dialkit"

export default function PreviewLayout() {
  return (
    <>
      <Outlet />
      <DialRoot position="top-right" />
    </>
  )
}
