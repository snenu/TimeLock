import { http, createConfig, createStorage, cookieStorage } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';
import { polygonAmoy } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '';

export const config = createConfig({
  chains: [polygonAmoy],
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
    [polygonAmoy.id]: http(process.env.NEXT_PUBLIC_RPC_URL || polygonAmoy.rpcUrls.default.http[0]),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export { polygonAmoy };