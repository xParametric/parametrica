const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gasLimit: 10000000,
      gas: 10000000,
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      chainId: 80001,
    },

    // sepolia

    sepolia: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
        ),
      network_id: 11155111,
      gasPrice: 64926022802,
      // confirmations: 2,
      // timeoutBlocks: 200,
      // skipDryRun: true,
      // websockets: true,
    },
  },
  contracts_directory: "./contracts",
  contracts_build_directory: "./abis",
  compilers: {
    solc: {
      version: "^0.8.6",
      optimizer: {
        enabled: true,

        runs: 200,
      },
    },
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    polygonscan: `${process.env.POLYGONSCAN_API_KEY}`,
    etherscan: `${process.env.ETHERSCAN_API_KEY}`,
  },
  db: {
    enabled: false,
  },
};
