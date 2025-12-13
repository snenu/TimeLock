// Deploy using Hardhat programmatically
import hre from 'hardhat';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenvConfig({ path: resolve(process.cwd(), '.env.local') });

async function main() {
  console.log("Deploying TimeLockContacts to Polygon Amoy...\n");

  // Set the network
  hre.config.networks.polygonAmoy = {
    url: process.env.POLYGON_AMOY_RPC || "https://rpc-amoy.polygon.technology",
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    chainId: 80002,
    timeout: 60000,
    gasPrice: 'auto'
  };

  // Compile contracts
  console.log("📦 Compiling contracts...");
  await hre.run('compile');

  // Get signers
  const provider = new hre.ethers.JsonRpcProvider(
    process.env.POLYGON_AMOY_RPC || "https://rpc-amoy.polygon.technology"
  );
  const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log("Deploying with account:", wallet.address);
  
  const balance = await provider.getBalance(wallet.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "MATIC\n");

  if (balance === 0n) {
    console.error("❌ Error: Insufficient balance. Please get testnet MATIC from:");
    console.log("https://faucet.polygon.technology/");
    process.exit(1);
  }

  // Deploy contract
  console.log("🚀 Deploying contract...");
  const TimeLockContacts = await hre.ethers.getContractFactory("TimeLockContacts", wallet);
  const contract = await TimeLockContacts.deploy();
  
  console.log("⏳ Waiting for deployment transaction...");
  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("\n✅ TimeLockContacts deployed to:", address);
  console.log("\n📝 Update your .env.local file:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  
  // Save deployment info
  const deploymentInfo = {
    address: address,
    deployer: wallet.address,
    network: "polygonAmoy",
    chainId: 80002,
    timestamp: new Date().toISOString(),
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'deployment-info.json'),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n✅ Deployment info saved to deployment-info.json");
  console.log("\n🔗 View on Amoy Explorer:");
  console.log(`https://amoy.polygonscan.com/address/${address}`);
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

