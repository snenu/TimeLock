const { createPublicClient, http } = require('viem');
const { polygonAmoy } = require('viem/chains');

const CONTRACT_ADDRESS = '0xA8006F58a9fe59e23a8768549ebfA89A9dE75908';
const RPC_URL = 'https://polygon-amoy.g.alchemy.com/v2/Db6C4RgfEaaDVcHvPllsg';

const CONTRACT_ABI = [
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
  const client = createPublicClient({
    chain: polygonAmoy,
    transport: http(RPC_URL)
  });

  try {
    console.log('Testing contract at:', CONTRACT_ADDRESS);
    console.log('');

    // Test 1: Get lock counter
    const counter = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'lockCounter'
    });
    console.log('✅ Total TimeLocks created:', counter.toString());

    // Test 2: Get user locks (replace with actual address)
    const testAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
    const userLocks = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'getUserLocks',
      args: [testAddress]
    });
    console.log(`✅ User ${testAddress} has ${userLocks.length} TimeLocks`);
    console.log('   Lock IDs:', userLocks.map(id => id.toString()).join(', '));

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

testContract();
