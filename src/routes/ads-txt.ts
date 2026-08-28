export async function loader() {
  const adsTxt = process.env.ADS_TXT || import.meta.env.VITE_ADS_TXT || ""

  if (!adsTxt) {
    return new Response("# No ads configured", {
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    })
  }

  return new Response(adsTxt, {
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  })
}
