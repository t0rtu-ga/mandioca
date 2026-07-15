import type { NextConfig } from "next";

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/borrador-claude/ui_kits/web/records.html",
        permanent: false,
      },
    ];
  },
} satisfies NextConfig;

export default nextConfig;
