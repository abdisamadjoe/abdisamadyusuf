import { GlowCard, GlowCardGrid } from "@/registry/components/glow-card-grid"

export default function Team01() {
  return (
    <div className="container px-4 py-8">
      <GlowCardGrid className="lg:grid-cols-4">
        {CARDS.map((card) => (
          <GlowCard
            key={card.name}
            name={card.name}
            handle={card.handle}
            avatar={card.avatar}
          />
        ))}
      </GlowCardGrid>
    </div>
  )
}

const CARDS = [
  {
    name: "shadcn",
    handle: "@shadcn",
    avatar: "https://unavatar.io/x/shadcn",
  },
  {
    name: "Evil Rabbit",
    handle: "@evilrabbit_",
    avatar: "https://unavatar.io/x/evilrabbit_",
  },
  {
    name: "OrcDev",
    handle: "@orcdev",
    avatar: "https://unavatar.io/x/orcdev",
  },
  {
    name: "David Haz",
    handle: "@davidhdev",
    avatar: "https://unavatar.io/x/davidhdev",
  },
  {
    name: "Shu",
    handle: "@shuding",
    avatar: "https://unavatar.io/x/shuding",
  },
  {
    name: "Emil Kowalski",
    handle: "@emilkowalski",
    avatar: "https://unavatar.io/x/emilkowalski",
  },
  {
    name: "Aaron",
    handle: "@aaronmahlke",
    avatar: "https://unavatar.io/x/aaronmahlke",
  },
  {
    name: "Chánh Đại",
    handle: "@iamncdai",
    avatar: "https://unavatar.io/x/iamncdai",
  },
]
