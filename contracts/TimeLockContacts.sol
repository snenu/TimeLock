// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TimeLockContacts {
    struct TimeLock {
        uint256 id;
        address owner;
        address recipient;
        string ipfsHash;
        string encryptionKeyHash;
        uint256 unlockTime;
        uint256 cryptoAmount;
        bool isUnlocked;
        bool isClaimed;
        string lockType;
        string metadata;
    }

    uint256 public lockCounter;
    mapping(uint256 => TimeLock) public timeLocks;
    mapping(address => uint256[]) public userLocks;
    mapping(address => uint256[]) public receivedLocks;

    event TimeLockCreated(
        uint256 indexed lockId,
        address indexed owner,
        address indexed recipient,
        uint256 unlockTime,
        string ipfsHash
    );

    event TimeLockUnlocked(uint256 indexed lockId, address indexed unlockedBy);
    event CryptoClaimed(uint256 indexed lockId, address indexed recipient, uint256 amount);

    modifier onlyOwnerOrRecipient(uint256 _lockId) {
        require(
            msg.sender == timeLocks[_lockId].owner || 
            msg.sender == timeLocks[_lockId].recipient,
            "Not authorized"
        );
        _;
    }

    function createTimeLock(
        address _recipient,
        string memory _ipfsHash,
        string memory _encryptionKeyHash,
        uint256 _unlockTime,
        string memory _lockType,
        string memory _metadata
    ) external payable returns (uint256) {
        require(_unlockTime > block.timestamp, "Unlock time must be in future");
        require(_recipient != address(0), "Invalid recipient");

        lockCounter++;
        
        TimeLock storage newLock = timeLocks[lockCounter];
        newLock.id = lockCounter;
        newLock.owner = msg.sender;
        newLock.recipient = _recipient;
        newLock.ipfsHash = _ipfsHash;
        newLock.encryptionKeyHash = _encryptionKeyHash;
        newLock.unlockTime = _unlockTime;
        newLock.cryptoAmount = msg.value;
        newLock.isUnlocked = false;
        newLock.isClaimed = false;
        newLock.lockType = _lockType;
        newLock.metadata = _metadata;

        userLocks[msg.sender].push(lockCounter);
        receivedLocks[_recipient].push(lockCounter);

        emit TimeLockCreated(lockCounter, msg.sender, _recipient, _unlockTime, _ipfsHash);
        
        return lockCounter;
    }

    function unlock(uint256 _lockId) external onlyOwnerOrRecipient(_lockId) {
        TimeLock storage lock = timeLocks[_lockId];
        require(!lock.isUnlocked, "Already unlocked");
        require(block.timestamp >= lock.unlockTime, "Not yet time to unlock");
        
        lock.isUnlocked = true;
        emit TimeLockUnlocked(_lockId, msg.sender);
    }

    function claimCrypto(uint256 _lockId) external {
        TimeLock storage lock = timeLocks[_lockId];
        require(msg.sender == lock.recipient, "Only recipient can claim");
        require(lock.isUnlocked, "Not yet unlocked");
        require(!lock.isClaimed, "Already claimed");
        require(lock.cryptoAmount > 0, "No crypto to claim");

        lock.isClaimed = true;
        uint256 amount = lock.cryptoAmount;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit CryptoClaimed(_lockId, msg.sender, amount);
    }

    function getTimeLock(uint256 _lockId) external view returns (TimeLock memory) {
        return timeLocks[_lockId];
    }

    function getUserLocks(address _user) external view returns (uint256[] memory) {
        return userLocks[_user];
    }

    function getReceivedLocks(address _user) external view returns (uint256[] memory) {
        return receivedLocks[_user];
    }

    function canUnlock(uint256 _lockId) external view returns (bool) {
        TimeLock memory lock = timeLocks[_lockId];
        return block.timestamp >= lock.unlockTime && !lock.isUnlocked;
    }

    function getTimeRemaining(uint256 _lockId) external view returns (uint256) {
        TimeLock memory lock = timeLocks[_lockId];
        if (block.timestamp >= lock.unlockTime) {
            return 0;
        }
        return lock.unlockTime - block.timestamp;
    }
}
