const puppeteer = require('puppeteer')
const certHTML = require('./certHTML')

const generateimage = async (donation) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'], // Required.
    headless: true,
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 960,
    height: 760,
    deviceScaleFactor: 1,
  })
  await page.setContent(certHTML(donation))
  await page.waitForSelector('#cert') // wait for the selector to load
  const element = await page.$('#cert')
  await element.screenshot({
    path: `${process.cwd()}/images/${donation.txHash}.png`,
  })
  return {
    imgPath: `${process.cwd()}/images/${donation.txHash}.png`,
  }
}

module.exports = generateimage
