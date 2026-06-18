"use client"

import dynamic from "next/dynamic"

export const Daikanoid = dynamic(
  () => import("./component").then((mod) => mod.Daikanoid),
  { ssr: false, loading: () => <div className="flex h-150 w-200" /> }
)
