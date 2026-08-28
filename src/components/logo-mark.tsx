export function LogoMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="5.5 8.5 11 13"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.4,16.5l-8.8,3.7v-2.7l5.8-2.2l-0.1,0.1v-0.3l0.1,0.1L6.6,13v-2.7l8.8,3.7V16.5z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="5.5 8.5 11 13"><path fill="currentColor" d="M15.4,16.5l-8.8,3.7v-2.7l5.8-2.2l-0.1,0.1v-0.3l0.1,0.1L6.6,13v-2.7l8.8,3.7V16.5z"/></svg>`
}
