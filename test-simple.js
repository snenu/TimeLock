const { createPublicClient, http } = require('viem');
const { polygonAmoy } = require('viem/chains');

const client = createPublicClient({
  chain: polygonAmoy,
  transport: http('https://polygon-amoy.g.alchemy.com/v2/Db6C4RgfEaaDVcHvPllsg')
});

client.readContract({
  address: '0x68C75Cc77bb3997bD3Fb3FeFDfD86B966aE7dE95',
  abi: [{
    inputs: [],
    name: 'lockCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }],
  functionName: 'lockCounter'
}).then(result => {
  console.log('✅ NEW CONTRACT WORKING!');
  console.log('lockCounter:', result.toString());
}).catch(err => {
  console.error('❌ Error:', err.shortMessage || err.message);
});
