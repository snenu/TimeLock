export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_recipient", type: "address" },
      { internalType: "string", name: "_ipfsHash", type: "string" },
      { internalType: "string", name: "_encryptionKeyHash", type: "string" },
      { internalType: "uint256", name: "_unlockTime", type: "uint256" },
      { internalType: "string", name: "_lockType", type: "string" },
      { internalType: "string", name: "_metadata", type: "string" }
    ],
    name: "createTimeLock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockId", type: "uint256" }],
    name: "unlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockId", type: "uint256" }],
    name: "claimCrypto",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockId", type: "uint256" }],
    name: "getTimeLock",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "string", name: "ipfsHash", type: "string" },
          { internalType: "string", name: "encryptionKeyHash", type: "string" },
          { internalType: "uint256", name: "unlockTime", type: "uint256" },
          { internalType: "uint256", name: "cryptoAmount", type: "uint256" },
          { internalType: "bool", name: "isUnlocked", type: "bool" },
          { internalType: "bool", name: "isClaimed", type: "bool" },
          { internalType: "string", name: "lockType", type: "string" },
          { internalType: "string", name: "metadata", type: "string" }
        ],
        internalType: "struct TimeLockContacts.TimeLock",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserLocks",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getReceivedLocks",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockId", type: "uint256" }],
    name: "canUnlock",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockId", type: "uint256" }],
    name: "getTimeRemaining",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lockCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "timeLocks",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "string", name: "ipfsHash", type: "string" },
      { internalType: "string", name: "encryptionKeyHash", type: "string" },
      { internalType: "uint256", name: "unlockTime", type: "uint256" },
      { internalType: "uint256", name: "cryptoAmount", type: "uint256" },
      { internalType: "bool", name: "isUnlocked", type: "bool" },
      { internalType: "bool", name: "isClaimed", type: "bool" },
      { internalType: "string", name: "lockType", type: "string" },
      { internalType: "string", name: "metadata", type: "string" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "userLocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "receivedLocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "lockId", type: "uint256" },
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "uint256", name: "unlockTime", type: "uint256" },
      { indexed: false, internalType: "string", name: "ipfsHash", type: "string" }
    ],
    name: "TimeLockCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "lockId", type: "uint256" },
      { indexed: true, internalType: "address", name: "unlockedBy", type: "address" }
    ],
    name: "TimeLockUnlocked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "lockId", type: "uint256" },
      { indexed: true, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "CryptoClaimed",
    type: "event"
  }
] as const;

export interface TimeLockData {
  id: bigint;
  owner: string;
  recipient: string;
  ipfsHash: string;
  encryptionKeyHash: string;
  unlockTime: bigint;
  cryptoAmount: bigint;
  isUnlocked: boolean;
  isClaimed: boolean;
  lockType: string;
  metadata: string;
}