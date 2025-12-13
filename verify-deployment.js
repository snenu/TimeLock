const { createPublicClient, http } = require('viem');
const { polygonAmoy } = require('viem/chains');

const CONTRACT_ADDRESS = '0xA8006F58a9fe59e23a8768549ebfA89A9dE75908';
const RPC_URL = 'https://polygon-amoy.g.alchemy.com/v2/Db6C4RgfEaaDVcHvPllsg';

async function verifyDeployment() {
  const client = createPublicClient({
    chain: polygonAmoy,
    transport: http(RPC_URL)
  });

  try {
    console.log('Checking contract at:', CONTRACT_ADDRESS);
    console.log('Chain: Polygon Amoy Testnet');
    console.log('');

    // Check if contract has bytecode
    const bytecode = await client.getBytecode({
      address: CONTRACT_ADDRESS
    });

    if (!bytecode || bytecode === '0x') {
      console.log('❌ NO CONTRACT DEPLOYED at this address!');
      console.log('');
      console.log('SOLUTION: You need to deploy the contract first:');
      console.log('1. Run: npx hardhat compile');
      console.log('2. Create deploy script in scripts/deploy.js');
      console.log('3. Run: npx hardhat run scripts/deploy.js --network polygonAmoy');
      console.log('4. Update .env.local with the new contract address');
    } else {
      console.log('✅ Contract IS deployed');
      console.log('Bytecode length:', bytecode.length, 'bytes');
      console.log('');
      console.log('But contract functions are reverting. This could mean:');
      console.log('1. ABI mismatch - contract was deployed with different code');
      console.log('2. Contract needs to be redeployed');
      console.log('3. RPC provider issue');
    }
  } catch (error) {
    console.error('❌ Error checking deployment:', error.message);
  }
}

verifyDeployment();
