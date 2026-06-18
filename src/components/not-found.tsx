import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Daikanoid } from "@/components/daikanoid"

export function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center py-6">
      <section className="max-lg:hidden">
        <Daikanoid className="ring-1 ring-border" />
      </section>

      <section className="flex flex-col items-center gap-6 lg:hidden">
        <h1 className="font-mono text-8xl font-medium">404</h1>
        <Button variant="outline" asChild>
          <Link href="/">
            Go to Home
            <ArrowRightIcon />
          </Link>
        </Button>
      </section>
    </div>
  )
}
