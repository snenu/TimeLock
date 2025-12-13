import type { NextConfig } from "next";
import path from "node:path";

// Loader path from orchids-visual-edits - use direct resolve to get the actual file
const loaderPath = require.resolve('orchids-visual-edits/loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Alias optional wagmi connector dependencies to empty stub
    const stubPath = path.resolve(__dirname, 'stubs/empty.js');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@base-org/account': stubPath,
      '@coinbase/wallet-sdk': stubPath,
      '@gemini-wallet/core': stubPath,
      '@metamask/sdk': stubPath,
      'porto': stubPath,
      'porto/internal': stubPath,
    };

    return config;
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [loaderPath]
      }
    }
  }
} as NextConfig;

export default nextConfig;
