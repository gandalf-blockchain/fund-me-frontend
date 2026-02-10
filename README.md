# Simple Storage — Foundry Fundamentals Project

A minimal smart contract built with Foundry to demonstrate fundamental blockchain development concepts.  
This project stores and retrieves a single number on-chain, serving as a foundation for understanding contract deployment, state management, and interaction workflows.

---

## About

This project implements a simple storage mechanism where:
- Users can store a favorite number
- Users can retrieve their stored number
- Multiple people can be tracked with their favorite numbers
- Contract demonstrates basic Solidity state variables and functions

The contract is designed to be **simple and educational**, making it perfect for learning Foundry toolchain basics and smart contract fundamentals.

---

## Features

- Store and retrieve unsigned integers on-chain
- Track multiple people with their favorite numbers
- Clean, minimal codebase for learning
- Foundry-based testing and deployment
- Compatible with local and testnet environments

---

## Tech Stack

- **Solidity** `^0.8.18`
- **Foundry** (Forge, Cast, Anvil)
- **Anvil** for local blockchain testing
- **Sepolia Testnet** for live deployment

---

## Requirements

- [Foundry](https://book.getfoundry.sh/)
- Git

Install Foundry:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

---

## Quick Start

Clone the repository:
```bash
git clone git@github.com:gandalf-blockchain/foundry-simple-storage.git
cd foundry-simple-storage
```

Build contracts:
```bash
forge build
```

Run tests:
```bash
forge test
```

---

## Deployment

### Deploy Locally (Anvil)

Start local blockchain:
```bash
anvil
```

Deploy contract (in new terminal):
```bash
forge script script/DeploySimpleStorage.s.sol --rpc-url http://localhost:8545 --private-key <ANVIL_PRIVATE_KEY> --broadcast
```

### Deploy to Testnet (Sepolia)

Create `.env` file:
```
SEPOLIA_RPC_URL=your_rpc_url
PRIVATE_KEY=your_private_key
```

Deploy:
```bash
source .env
forge script script/DeploySimpleStorage.s.sol --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY
```

---

## Interacting with Contract

### Using Cast (CLI)

Store a number:
```bash
cast send <CONTRACT_ADDRESS> "store(uint256)" 42 --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

Retrieve the number:
```bash
cast call <CONTRACT_ADDRESS> "retrieve()" --rpc-url <RPC_URL>
```

Convert hex output to decimal:
```bash
cast --to-base <HEX_OUTPUT> dec
```

---

## Project Structure

```
foundry-simple-storage/
├── src/
│   └── SimpleStorage.sol       # Main contract
├── script/
│   └── DeploySimpleStorage.s.sol  # Deployment script
├── test/
│   └── SimpleStorage.t.sol     # Contract tests
├── foundry.toml                # Foundry configuration
└── README.md
```

---

## Learning Outcomes

This project teaches:
- ✅ Foundry project setup and structure
- ✅ Basic Solidity contract development
- ✅ State variables and functions
- ✅ Contract compilation with `forge build`
- ✅ Local deployment with Anvil
- ✅ Testnet deployment and verification
- ✅ Contract interaction using Cast CLI
- ✅ Transaction broadcasting and management

---

## Security Considerations

- Never commit private keys or `.env` files
- Use separate wallets for development and production
- Always verify contracts on Etherscan after deployment
- Test thoroughly on local/testnet before mainnet

---

## Resources

- [Foundry Book](https://book.getfoundry.sh/)
- [Cyfrin Updraft - Foundry Fundamentals](https://updraft.cyfrin.io/courses/foundry)
- [Solidity Documentation](https://docs.soliditylang.org/)
