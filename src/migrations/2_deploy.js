const Token = artifacts.require("DCBToken");
const DBank = artifacts.require("DBank");

module.exports = async function (deployer) {
  await deployer.deploy(Token);

  const token = await Token.deployed();

  await deployer.deploy(DBank, token.address);

  const bank = await DBank.deployed();

  await token.changeMinter(bank.address);
};
