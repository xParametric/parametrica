const Paramarket = artifacts.require("Paramarket");

module.exports = async function (deployer) {
  await deployer.deploy(
    Paramarket,
    "0xb2200E06c83F3872e89AaA98A7d5cd439c7ebd94" // ParaToken address
  );
};
