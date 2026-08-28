import React, { Suspense } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { MemoryRouter } from "react-router"
import type * as ReactRouter from "react-router"
import { test, vi } from "vitest"

import Root from "../root"
import AppLayout from "./app-layout"
import Home from "./home"

// Mock react-router's useLoaderData
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof ReactRouter>()
  return {
    ...actual,
    useLoaderData: () => ({
      insightsData: null,
      blogPosts: [],
      docPreviews: [],
    }),
  }
})

const wrap = (node: React.ReactNode) => (
  <MemoryRouter>
    <Suspense fallback={null}>{node}</Suspense>
  </MemoryRouter>
)

test("render Home component", () => {
  renderToStaticMarkup(wrap(<Home />))
})

test("render AppLayout component", () => {
  renderToStaticMarkup(wrap(<AppLayout />))
})

test("render Root component", () => {
  renderToStaticMarkup(wrap(<Root />))
})
