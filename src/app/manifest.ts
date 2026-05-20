import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bellezza Salon — Alta Bellezza Italiana",
    short_name: "Bellezza Salon",
    description: "Salone di alta bellezza a Milano. Prenota i tuoi trattamenti online.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcf7f0",
    theme_color: "#7a2e3e",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
