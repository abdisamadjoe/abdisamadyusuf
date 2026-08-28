import React, { lazy } from "react"

export default function dynamic<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options?: { ssr?: boolean; loading?: () => React.ReactNode }
): React.ComponentType<any> {
  const ssr = options?.ssr ?? true
  const Loading = options?.loading ?? (() => null)

  if (!ssr && typeof window === "undefined") {
    const ServerFallback = () => <Loading />
    ServerFallback.displayName = "DynamicServerFallback"
    return ServerFallback
  }

  const LazyComponent = lazy(async () => {
    const res = await importFn()
    if (res && typeof res === "object" && "default" in res) {
      return res as { default: T }
    }
    return { default: res } as { default: T }
  })

  const ClientWrapper = (props: any) => (
    <React.Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </React.Suspense>
  )
  ClientWrapper.displayName = "DynamicClientWrapper"

  return ClientWrapper
}
