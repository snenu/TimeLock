// Deploy using Hardhat programmatically
import hre from 'hardhat';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (try .env first, then .env.local)
dotenvConfig({ path: resolve(process.cwd(), '.env') });
dotenvConfig({ path: resolve(process.cwd(), '.env.local') });

const USE_MAINNET = process.argv.includes('--mainnet') || process.env.DEPLOY_MAINNET === 'true';

async function main() {
  const isMainnet = USE_MAINNET;
  const rpcUrl = isMainnet
    ? (process.env.POLYGON_MAINNET_RPC || "https://polygon.drpc.org")
    : (process.env.POLYGON_AMOY_RPC || "https://rpc-amoy.polygon.technology");
  const chainId = isMainnet ? 137 : 80002;
  const networkName = isMainnet ? "polygonMainnet" : "polygonAmoy";
  const explorerBase = isMainnet ? "https://polygonscan.com" : "https://amoy.polygonscan.com";

  console.log(`Deploying TimeLockContacts to ${isMainnet ? 'Polygon Mainnet' : 'Polygon Amoy'}...\n`);

  hre.config.networks[networkName] = {
    url: rpcUrl,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    chainId,
    timeout: 60000,
    gasPrice: 'auto'
  };

  console.log("📦 Compiling contracts...");
  await hre.run('compile');

  const provider = new hre.ethers.JsonRpcProvider(rpcUrl);
  const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log("Deploying with account:", wallet.address);
  
  const balance = await provider.getBalance(wallet.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "POL\n");

  if (balance === 0n) {
    console.error("❌ Error: Insufficient balance. Please get POL from an exchange or faucet.");
    if (!isMainnet) console.log("Testnet: https://faucet.polygon.technology/");
    process.exit(1);
  }

  console.log("🚀 Deploying contract...");
  const TimeLockContacts = await hre.ethers.getContractFactory("TimeLockContacts", wallet);
  const contract = await TimeLockContacts.deploy();
  
  console.log("⏳ Waiting for deployment transaction...");
  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("\n✅ TimeLockContacts deployed to:", address);
  console.log("\n📝 Update your .env file:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  
  const deploymentInfo = {
    address: address,
    deployer: wallet.address,
    network: networkName,
    chainId,
    timestamp: new Date().toISOString(),
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'deployment-info.json'),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n✅ Deployment info saved to deployment-info.json");
  console.log("\n🔗 View on Explorer:");
  console.log(`${explorerBase}/address/${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error.message);
    if (error.transaction) {
      console.error("Transaction hash:", error.transaction.hash);
    }
    console.error(error);
    process.exit(1);
  });

