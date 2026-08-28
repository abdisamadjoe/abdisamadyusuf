import { visit } from "unist-util-visit"

/**
 * Removes YAML frontmatter nodes from the MDX AST. Without this, the raw
 * `title:`/`description:`/etc. frontmatter block renders as plain text at the
 * top of MDX documents compiled through Vite's MDX plugin.
 */
export function remarkStripFrontmatter() {
  return (tree: Parameters<typeof visit>[0]) => {
    const nodes: Array<{ index: number; parent: any }> = []

    visit(tree, (node, index, parent) => {
      if (node.type === "yaml" && parent && typeof index === "number") {
        nodes.push({ index, parent })
      }
    })

    for (const { index, parent } of nodes.reverse()) {
      parent.children.splice(index, 1)
    }
  }
}
