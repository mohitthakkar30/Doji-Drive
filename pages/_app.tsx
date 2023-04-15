import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { Chain, chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const dojima: Chain = {
  id: 1001,
  name: "Dojima Chain",
  network: "Dojima Chain",
  // iconUrl: 'https://example.com/icon.svg',
  // iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'DOJI',
    symbol: 'DOJI',
  },
  rpcUrls: {
    default: 'https://rpc-test.d11k.dojima.network:8545/',
  
  },
  testnet: false,
};
  
const { chains, provider, webSocketProvider } = configureChains(
  [
      dojima,
    // chain.polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.polygonMumbai]
      : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: 'r1xrnkXFSD92Fd715SqGkluuVwQ_5-YK',
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
function getDefaultClient(arg0: { autoConnect: boolean; appName: string; chains: { id: number; name: string; network: string; nativeCurrency: { decimals: number; name: string; symbol: string; }; rpcUrls: { default: { http: string[]; }; }; testnet: boolean; }[]; }): import("wagmi").CreateClientConfig<import("@wagmi/core/dist/index-58cffc47").P, import("@wagmi/core/dist/index-58cffc47").W> {
  throw new Error('Function not implemented.');
}

