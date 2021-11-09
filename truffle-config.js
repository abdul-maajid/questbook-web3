const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

require('dotenv').config()

module.exports = {
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    // development: {
    //  host: "127.0.0.1",     // Localhost (default: none)
    //  port: 8545,            // Standard Ethereum port (default: none)
    //  network_id: "*",       // Any network (default: none)
    // },
    BNBtestnet: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic
          },
          providerOrUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
          numberOfAddresses: 1,
          shareNonce: true,
        }),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 20000,
      skipDryRun: true
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic
          },
          providerOrUrl: "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY,
          numberOfAddresses: 1,
          shareNonce: true,
        }),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    mainnet: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      networkCheckTimeout: 1000000,
      gas: 4500000,
      gasPrice: 10000000000,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic
          },
          providerOrUrl: "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY,
          numberOfAddresses: 1,
          shareNonce: true,
        }),
      network_id: '4',
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    // old was not working
    // rinkeby: {
    //   provider: () => new HDWalletProvider(process.env.MNENOMIC, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`),
    //   network_id: 4,       // Ropsten's id
    //   gas: 5500000,        // Ropsten has a lower block limit than mainnet
    //   confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    matic: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.7",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
       evmVersion: "berlin"
      }
    }
  },

  plugins: [
    'truffle-plugin-verify'
  ],

  api_keys: {
    etherscan: process.env.BSCSCAN_API_KEY
  }

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
  // }
};
