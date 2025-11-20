import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/", // / 루트 접근 시
        destination: "/home", // /home으로 이동
        permanent: true, // 308 Permanent Redirect
      },
    ];
  },
};

export default nextConfig;
