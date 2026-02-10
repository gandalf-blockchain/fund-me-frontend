// Import ethers and contract details
import { ethers } from "./ethers-6.7.esm.min.js"
import { abi, contractAddress } from "./constants.js"

// Get button references
const connectButton = document.getElementById("connectButton")
const withdrawButton = document.getElementById("withdrawButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")

// Assign onclick handlers
connectButton.onclick = connect
withdrawButton.onclick = withdraw
fundButton.onclick = fund
balanceButton.onclick = getBalance

// Helper function for UI messages (OPTIONAL - tambahan untuk UX)
function showMessage(message, type = "info") {
  const messageBox = document.getElementById("messageBox")
  if (messageBox) {
    messageBox.innerHTML = `<div class="message ${type}">${message}</div>`
    setTimeout(() => {
      messageBox.innerHTML = ""
    }, 5000)
  }
}

// Helper function to update status badge (OPTIONAL)
function updateConnectionStatus(isConnected) {
  const statusBadge = document.getElementById("statusBadge")
  if (statusBadge) {
    if (isConnected) {
      statusBadge.textContent = "Connected"
      statusBadge.classList.add("connected")
    } else {
      statusBadge.textContent = "Not Connected"
      statusBadge.classList.remove("connected")
    }
  }
}

// Helper function to display balance (OPTIONAL)
function displayBalance(balance) {
  const balanceDisplay = document.getElementById("balanceDisplay")
  const balanceAmount = document.getElementById("balanceAmount")

  if (balanceDisplay && balanceAmount) {
    balanceAmount.textContent = balance
    balanceDisplay.style.display = "block"
  }
}

// ORIGINAL FUNCTIONS - TIDAK DIUBAH SAMA SEKALI
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
      connectButton.innerHTML = "Connected"
      const accounts = await ethereum.request({ method: "eth_accounts" })
      console.log(accounts)

      // UI enhancement (optional)
      updateConnectionStatus(true)
      showMessage("✓ Wallet connected successfully!", "success")
    } catch (error) {
      console.log(error)
      showMessage("Failed to connect wallet", "error")
    }
  } else {
    connectButton.innerHTML = "Please install MetaMask"
    showMessage("Please install MetaMask", "error")
  }
}

async function withdraw() {
  console.log(`Withdrawing...`)
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      console.log("Processing transaction...")
      showMessage("Please confirm transaction in MetaMask...", "info")

      const transactionResponse = await contract.withdraw()
      showMessage("Transaction submitted! Waiting for confirmation...", "info")

      await transactionResponse.wait(1)
      console.log("Done!")

      showMessage("✓ Withdraw successful!", "success")
      // Auto-refresh balance after withdraw
      setTimeout(() => getBalance(), 1000)
    } catch (error) {
      console.log(error)
      showMessage("Withdraw failed. Make sure you are the owner.", "error")
    }
  } else {
    withdrawButton.innerHTML = "Please install MetaMask"
    showMessage("Please install MetaMask", "error")
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value
  console.log(`Funding with ${ethAmount}...`)

  if (!ethAmount || ethAmount <= 0) {
    showMessage("Please enter a valid ETH amount", "error")
    return
  }

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      showMessage("Please confirm transaction in MetaMask...", "info")

      const transactionResponse = await contract.fund({
        value: ethers.parseEther(ethAmount),
      })

      showMessage("Transaction submitted! Waiting for confirmation...", "info")
      await transactionResponse.wait(1)

      showMessage(`✓ Successfully funded ${ethAmount} ETH!`, "success")
      // Clear input after successful fund
      document.getElementById("ethAmount").value = ""
    } catch (error) {
      console.log(error)
      showMessage("Transaction failed", "error")
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask"
    showMessage("Please install MetaMask", "error")
  }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum)
    try {
      const balance = await provider.getBalance(contractAddress)
      const balanceInEth = ethers.formatEther(balance)
      console.log(balanceInEth)

      // Display balance in UI
      displayBalance(balanceInEth)
      showMessage("✓ Balance updated", "success")
    } catch (error) {
      console.log(error)
      showMessage("Failed to get balance", "error")
    }
  } else {
    balanceButton.innerHTML = "Please install MetaMask"
    showMessage("Please install MetaMask", "error")
  }
}
