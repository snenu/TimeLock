import { http, createConfig, createStorage, cookieStorage } from 'wagmi';
import { injected } from '@wagmi/core';
import { polygon } from 'wagmi/chains';

// WalletConnect excluded: @phosphor-icons has pnpm-only paths that break npm builds.
// MetaMask (injected) works. Use pnpm or Vercel (often uses different resolution) for full WalletConnect.
export const config = createConfig({
  chains: [polygon],
  connectors: [injected()],
  transports: {
    [polygon.id]: http(process.env.NEXT_PUBLIC_RPC_URL || process.env.NEXT_PUBLIC_POLYGON_MAINNET_RPC || polygon.rpcUrls.default.http[0]),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export { polygon };