import React from "react";
import ReactDOM from "react-dom/client";
import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { WagmiProvider } from "wagmi";
const projectId = "my_project_id";

const wagmiNetworks = [mainnet];
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
  projectId,
  metadata,
  themeMode: "dark",
  themeVariables: {
    "--w3m-z-index": 1999,
  },
});


const App = () => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <div>Minimal Reproducible Example</div>
    </WagmiProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
