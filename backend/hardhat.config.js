/* eslint-disable node/no-unpublished-require */
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers')

const { API_URL, METAMASK_PRIVATE_KEY } = require('./src/config')

module.exports = {
  solidity: '0.8.0',
  defaultNetwork: 'mumbai',
  networks: {
    hardhat: {},
    mumbai: {
      url: API_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
    },
  },
}
