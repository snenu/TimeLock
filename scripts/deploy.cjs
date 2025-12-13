const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  // Ensure we're on Polygon Amoy network
  const network = await hre.ethers.provider.getNetwork();
  console.log("Deploying TimeLockContacts to Polygon Amoy...\n");
  console.log("Network:", network.name, "Chain ID:", network.chainId.toString());

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "POL\n");

  const TimeLockContacts = await hre.ethers.getContractFactory("TimeLockContacts");
  const contract = await TimeLockContacts.deploy();
  
  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("✅ TimeLockContacts deployed to:", address);
  console.log("\n📝 Update your .env.local file:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  
  // Save deployment info
  const deploymentInfo = {
    address: address,
    deployer: deployer.address,
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    timestamp: new Date().toISOString(),
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../deployment-info.json'),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n✅ Deployment info saved to deployment-info.json");
  console.log("\n🔗 View on Amoy Explorer:");
  console.log(`https://amoy.polygonscan.com/address/${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
