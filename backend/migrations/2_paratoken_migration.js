const Paratoken = artifacts.require("Paratoken");
// const Polymarket = artifacts.require("Polymarket");

module.exports = async function (deployer) {
  await deployer.deploy(Paratoken);
  const paratoken = await Paratoken.deployed();
  console.log(`paratoken.address`, paratoken.address);
  // await deployer.deploy(Polymarket, polyToken.address);
};
