# Fund Me Frontend — Web3 Learning Project

A minimal frontend interface for interacting with the Fund Me smart contract using browser-based Web3 technologies.  
This project demonstrates the complete flow from wallet connection to contract interaction, serving as a practical introduction to dApp development.

---

## About

This is a learning project built as part of the [Cyfrin Updraft](https://updraft.cyfrin.io/) Foundry Fundamentals course.

**Key Learning Concepts:**
- Frontend ≠ trust layer (users must verify contracts themselves)
- Wallet → Provider → Signer → Contract interaction flow
- Understanding calldata & function selectors
- How users can be exploited even without contract bugs

The interface allows users to:
- Connect their MetaMask wallet
- Fund the smart contract with ETH
- Withdraw funds (owner only)
- Check contract balance

---

## Tech Stack

- **HTML** - Structure
- **JavaScript** - Logic
- **ethers.js** - Blockchain interaction library
- **MetaMask** - Wallet provider

---

## Requirements

- [Git](https://git-scm.com/)
- [MetaMask](https://metamask.io/) browser extension
- A local blockchain (Anvil) or zkSync node running
- Deployed Fund Me contract

**Verify Git installation:**
```bash
git --version
```

---

## Quick Start

### 1. Clone the Repository

```bash
git clone git@github.com:gandalf-blockchain/html-fund-me.git
cd html-fund-me
```

### 2. Run the Frontend

**Option A: Double-click** `index.html` to open in browser

**Option B: Use Live Server** (Recommended)
- Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VSCode extension
- Right-click `index.html` → "Open with Live Server"

You should see a page with a "Connect" button.

---

## Setup Backend (Smart Contract)

Before you can interact with the frontend, you need a deployed Fund Me contract.

### Option 1: Local Blockchain (Foundry + Anvil)

**Terminal 1** — Start local blockchain:
```bash
git clone https://github.com/gandalf-blockchain/foundry-fund-me.git
cd foundry-fund-me
forge build
anvil
```

**Terminal 2** — Deploy contract:
```bash
make deploy
```

Copy the deployed contract address from the output.

---

### Option 2: zkSync Local Node (Advanced)

**Terminal 1** — Start zkSync node:
```bash
cd foundry-fund-me
make zkbuild
npx zksync-cli dev start
```

**Terminal 2** — Deploy to zkSync:
```bash
make deploy-zk
```

Copy the deployed contract address from the output.

---

## Configuration

### Update Contract Address

Open `constants.js` and update the `contractAddress` variable:

```javascript
export const contractAddress = "0x..." // Your deployed contract address
```

---

## Connect MetaMask

### ⚠️ Security Warning

**NEVER use a MetaMask account with real funds for development/testing.**

Use a separate browser profile or dedicated development account.

---

### For Local Anvil

1. **Add Local Network to MetaMask:**
   - Network Name: `Localhost 8545`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

2. **Import Test Account:**
   - Copy one of the private keys from Anvil output
   - MetaMask → Import Account → Paste private key

---

### For zkSync Local Node

1. **Add zkSync Local Network:**
   - Network Name: `zkSync Local`
   - RPC URL: `http://127.0.0.1:8011`
   - Chain ID: `260`
   - Currency Symbol: `ETH`

2. **Import zkSync Test Account:**
   - Use the `DEFAULT_ZKSYNC_LOCAL_KEY` from the `Makefile`
   - MetaMask → Import Account → Paste private key

---

## Usage

1. **Connect Wallet**
   - Click "Connect" button
   - Approve MetaMask connection

2. **Fund the Contract**
   - Enter amount in ETH (e.g., `0.1`)
   - Click "Fund" button
   - Confirm transaction in MetaMask

3. **Withdraw Funds** (Owner only)
   - Click "Withdraw" button
   - Confirm transaction in MetaMask

4. **Check Balance**
   - Click "Get Balance" button
   - View contract balance in console/UI

---

## Project Structure

```
html-fund-me/
├── index.html          # Main HTML page
├── index.js            # Frontend logic & contract interaction
├── constants.js        # Contract address & ABI
└── README.md
```

---

## Learning Outcomes

This project teaches:
- ✅ MetaMask wallet integration
- ✅ Web3 provider setup with ethers.js
- ✅ Signer creation and transaction signing
- ✅ Smart contract interaction from frontend
- ✅ Function selector understanding
- ✅ Transaction broadcasting and confirmation
- ✅ Local blockchain testing workflow
- ✅ Frontend security considerations

---

## Security Considerations

**For Users:**
- Always verify contract addresses
- Never trust the frontend blindly
- Check contract source code on Etherscan
- Understand what transactions you're signing

**For Developers:**
- Frontend is NOT a trust layer
- Contracts must handle all security logic
- Never store private keys in frontend code
- Always use environment-specific wallets

---

## Common Issues

### MetaMask not connecting?
- Check if MetaMask is unlocked
- Verify correct network is selected
- Refresh the page

### Transaction failing?
- Ensure contract is deployed
- Verify `contractAddress` in `constants.js`
- Check wallet has sufficient ETH for gas

### Wrong network?
- MetaMask → Switch to correct network (Localhost 8545 or zkSync Local)

---

## Resources

- [Cyfrin Updraft - Foundry Fundamentals](https://updraft.cyfrin.io/courses/foundry)
- [MetaMask Documentation](https://docs.metamask.io/)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Foundry Book](https://book.getfoundry.sh/)
