import { http, createConfig, createStorage, cookieStorage } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';
import { polygon } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = createConfig({
  chains: [polygon],
  connectors: [
    injected(),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'TimeLock Contacts',
        description: 'Send messages, files & crypto into the future',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://timelock.app',
        icons: [`${typeof window !== 'undefined' ? window.location.origin : 'https://timelock.app'}/icon.png`]
      },
      showQrModal: true,
    }),
  ],
  transports: {
    [polygon.id]: http(process.env.NEXT_PUBLIC_RPC_URL || process.env.NEXT_PUBLIC_POLYGON_MAINNET_RPC || polygon.rpcUrls.default.http[0]),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export { polygon };