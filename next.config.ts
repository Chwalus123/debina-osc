import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Nie bundluj — wymagają natywnych modułów Node.js niedostępnych w Turbopack
  serverExternalPackages: ['node-ical', 'nodemailer'],
  images: {
    // Dopuszczalne wartości quality w next/image (domyślnie tylko [75])
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
