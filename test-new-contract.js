const { createPublicClient, http } = require('viem');
const { polygonAmoy } = require('viem/chains');

const CONTRACT_ADDRESS = '0x68C75Cc77bb3997bD3Fb3FeFDfD86B966aE7dE95';
const RPC_URL = 'https://polygon-amoy.g.alchemy.com/v2/Db6C4RgfEaaDVcHvPllsg';

const ABI = [
  {
    inputs: [],
    name: 'lockCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getUserLocks',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  }
];

async function testContract() {
  console.log('Testing NEW contract at:', CONTRACT_ADDRESS);
  console.log('');

  const client = createPublicClient({
    chain: polygonAmoy,
    transport: http(RPC_URL)
  });

  try {
    // Test lockCounter
    const lockCounter = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'lockCounter'
    });
    console.log('✅ lockCounter:', lockCounter.toString());

    // Test getUserLocks with a random address
    const testAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1';
    const userLocks = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'getUserLocks',
      args: [testAddress]
    });
    console.log('✅ getUserLocks:', userLocks.length, 'locks');

    console.log('');
    console.log('✅ NEW CONTRACT IS WORKING!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testContract();
