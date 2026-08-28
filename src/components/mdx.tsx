import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/base/ui/tabs"
import { Code } from "@/components/base/ui/typography"
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"
import { ComponentSource } from "@/components/component-source"
import { DocSponsors } from "@/features/doc/components/doc-sponsors"
import { DocTestimonial } from "@/features/doc/components/doc-testimonial"
import { DocTestimonial2 } from "@/features/doc/components/doc-testimonial-2"

import { Callout } from "./callout"
import { CodeTabs } from "./code-tabs"
import { ComponentPreview } from "./component-preview"
import { FramedImage, IframeEmbed, YouTubeEmbed } from "./embed"
import { Heading } from "./heading"
import { mdxCodeBlockComponents } from "./mdx-code-block"

export const components = {
  h1: (props: ComponentProps<"h1">) => <Heading as="h1" {...props} />,
  h2: (props: ComponentProps<"h2">) => <Heading as="h2" {...props} />,
  h3: (props: ComponentProps<"h3">) => <Heading as="h3" {...props} />,
  h4: (props: ComponentProps<"h4">) => <Heading as="h4" {...props} />,
  h5: (props: ComponentProps<"h5">) => <Heading as="h5" {...props} />,
  h6: (props: ComponentProps<"h6">) => <Heading as="h6" {...props} />,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  ...mdxCodeBlockComponents,
  code: Code,
  ComponentPreview,
  ComponentSource,
  CodeCollapsibleWrapper,
  CodeTabs,
  Callout,
  Steps: ({ className, ...props }: ComponentProps<"div">) => (
    <div
      className={cn(
        "relative md:ml-3 md:pl-7 prose-h3:text-base",
        "before:pointer-events-none before:absolute before:top-0 before:left-0 before:hidden before:h-full before:w-px before:-translate-x-1/2 before:bg-line before:md:flex",
        className
      )}
      {...props}
    />
  ),
  Step: ({ className, ...props }: ComponentProps<"h3">) => (
    <h3 className={cn("step font-medium", className)} {...props} />
  ),
  Tabs,
  TabsList,
  TabsIndicator,
  TabsTrigger,
  TabsContent,
  TabsListInstallType: () => (
    <TabsList>
      <TabsTrigger value="cli">Command</TabsTrigger>
      <TabsTrigger value="manual">Manual</TabsTrigger>
      <TabsIndicator />
    </TabsList>
  ),
  YouTubeEmbed,
  IframeEmbed,
  FramedImage,
  DocTestimonial,
  DocTestimonial2,
  DocSponsors,
  AutoTypeTable: () => null,
}
