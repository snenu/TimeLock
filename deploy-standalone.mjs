#!/usr/bin/env node
/**
 * Standalone deployment script using ethers (no Hardhat runtime).
 * Use when: npm run deploy:mainnet fails (e.g. Hardhat 3 ESM issues).
 * Run: node deploy-standalone.mjs
 */
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenvConfig } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenvConfig({ path: path.join(__dirname, '.env') });
dotenvConfig({ path: path.join(__dirname, '.env.local') });

const RPC_URL = process.env.POLYGON_MAINNET_RPC || 'https://polygon.drpc.org';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error('❌ PRIVATE_KEY not set in .env');
  process.exit(1);
}

async function main() {
  console.log('Deploying TimeLockContacts to Polygon Mainnet...\n');

  const artifactPath = path.join(__dirname, 'artifacts', 'contracts', 'TimeLockContacts.sol', 'TimeLockContacts.json');
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log('Deploying with account:', wallet.address);
  const balance = await provider.getBalance(wallet.address);
  console.log('Account balance:', ethers.formatEther(balance), 'POL\n');

  if (balance === 0n) {
    console.error('❌ Insufficient balance. Get POL from an exchange.');
    process.exit(1);
  }

  console.log('🚀 Deploying contract...');
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log('\n✅ TimeLockContacts deployed to:', address);
  console.log('\n📝 Update your .env file:');
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);

  const deploymentInfo = {
    address,
    deployer: wallet.address,
    network: 'polygonMainnet',
    chainId: 137,
    timestamp: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(__dirname, 'deployment-info.json'), JSON.stringify(deploymentInfo, null, 2));
  console.log('\n✅ Deployment info saved to deployment-info.json');
  console.log('\n🔗 View on Explorer: https://polygonscan.com/address/' + address);
}

main().catch((err) => {
  console.error('❌ Deployment failed:', err.message);
  process.exit(1);
});
