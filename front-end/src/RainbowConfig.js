// src/RainbowConfig.js
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
// import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { baseSepolia } from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID', // Replace with your actual project ID
    chains: [baseSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

export { config, RainbowKitProvider, QueryClientProvider, queryClient, WagmiProvider };
