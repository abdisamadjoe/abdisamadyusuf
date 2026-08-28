"use client"

import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import type { ChevronsUpDownIconHandle } from "@/registry/components/chevrons-up-down-icon"
import { ChevronsUpDownIcon } from "@/registry/components/chevrons-up-down-icon"

export default function ChevronsUpDownIconDemo() {
  const [open, setOpen] = useState(false)
  const chevronsUpDownIconRef = useRef<ChevronsUpDownIconHandle>(null)

  useEffect(() => {
    const controls = chevronsUpDownIconRef.current
    if (!controls) return

    if (open) {
      controls.startAnimation()
    } else {
      controls.stopAnimation()
    }
  }, [open])

  return (
    <Button
      data-open={open}
      variant="outline"
      size="icon"
      onClick={() => setOpen((open) => !open)}
    >
      <ChevronsUpDownIcon
        ref={chevronsUpDownIconRef}
        duration={0.2}
        className="size-5"
      />
    </Button>
  )
}
