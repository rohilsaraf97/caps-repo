const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const { PINATA_JWT } = require('../config')

const pinFileToIPFS = async (imgPath, donation) => {
  const formData = new FormData()
  const src = imgPath

  const file = fs.createReadStream(src)
  formData.append('file', file)

  const metadata = JSON.stringify({
    name: donation.txHash,
  })
  formData.append('pinataMetadata', metadata)

  const options = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', options)

  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${PINATA_JWT}`,
        },
      }
    )
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const pinJSON = async (imgPath, donation) => {
  const pinFile = await pinFileToIPFS(imgPath, donation)
  const data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      donor: donation.donor,
      txHash: donation.txHash,
      image: `https://gateway.pinata.cloud/ipfs/${pinFile.IpfsHash}`,
    },
    pinataMetadata: {
      name: `${donation.txHash} json`,
    },
  })

  const config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    data: data,
  }

  const res = await axios(config)
  return res.data
}

module.exports = pinJSON
