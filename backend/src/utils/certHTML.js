const certHTML = (donation) => {
  const html = `<div id="cert" style="border:2px solid #333;padding:20px;max-width:500px;margin:0 auto"><h1 style="font-size:24px;text-align:center">Certificate of Transaction</h1><hr style="border:1px solid #333"><p style="font-size:18px"><strong>Name:</strong>${donation.donor}</p><p style="font-size:18px"><strong>Transaction Hash:</strong>${donation.txHash}</p><p style="font-size:18px"><strong>Amount:</strong>${donation.amount} MATIC</p></div>`
  return html
}

module.exports = certHTML
