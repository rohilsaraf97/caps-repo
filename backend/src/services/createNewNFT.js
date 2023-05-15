const { generateimage, pinJSON } = require('../utils')
const {
  API_URL,
  METAMASK_PRIVATE_KEY,
  METAMASK_PUBLIC_KEY,
  CONTRACT_ADDRESS,
} = require('../config')
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')

const web3 = createAlchemyWeb3(API_URL)
const contract = require('../../artifacts/contracts/Fund3NFT.sol/TorNFT.json')

const contractAddress = CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI, donation) {
  const nonce = await web3.eth.getTransactionCount(
    METAMASK_PUBLIC_KEY,
    'latest'
  )
  const tx = {
    from: METAMASK_PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    maxPriorityFeePerGas: 1999999987,
    data: nftContract.methods.createNFT(donation.donor, tokenURI).encodeABI(),
  }
  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    METAMASK_PRIVATE_KEY
  )
  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  )

  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`)
  return {
    NFTtxHash: transactionReceipt.transactionHash,
  }
}

const createNewNFT = async (donation) => {
  const { imgPath } = await generateimage(donation)
  const IPFSdata = await pinJSON(imgPath, donation)
  const tokenURI = `https://gateway.pinata.cloud/ipfs/${IPFSdata.IpfsHash}`
  const resp = await mintNFT(tokenURI, donation)
  return {
    tokenURI,
    NFTtxHash: resp.NFTtxHash,
  }
}

module.exports = createNewNFT
