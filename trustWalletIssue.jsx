import React, {memo,useCallback} from "react";
import ReactDOM from "react-dom/client";
import { createAppKit,useAppKit,useAppKitState, useDisconnect  } from '@reown/appkit/react';
import { useAccount, useSignMessage } from "wagmi";
import { mainnet } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const projectId = "my_project_id";

const wagmiNetworks = [mainnet,polygon];
const metadata = {
  name: "AppKit",
  description: "Minimal Repro Example",
  url: "https://example.com", // Must match your domain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const wagmiAdapter = new WagmiAdapter({
  networks: wagmiNetworks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: wagmiNetworks,
  allowUnsupportedChain:false,
  projectId,
  metadata,
  features: {
    analytics: false,
    socials: [],
    email: false
  },
  themeMode: 'dark',
  themeVariables: {
    "--w3m-z-index": 1999,
  }
})

const Sign = () => {
  const { open } = useAppKit();
  const { address, isConnected, connector } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { open: isOpen } = useAppKitState();
  const { disconnect } = useDisconnect();
  const getSign = useCallback(async () => {
    try {
      if (!isConnected) {
        open({ view: "Connect" });
        return;
      }
      setSigningThrough("walletConnect");
      const sign = await signMessageAsync({
        account: address,
        message: `${message}`,
      });
      console.log({ address: address, sign });
      await disconnect();
    } catch (error) {
      await disconnect();
      console.error(error.shortMessage || error.message)
    }
  },[address,isConnected]);
  return (
    <button className='' onClick={() => getSign()}>
      {!isOpen && "Connect Wallet"}
      {isOpen && "Connecting..." }
    </button>
  );
};
const App = () => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}><Sign/></QueryClientProvider>
    </WagmiProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
