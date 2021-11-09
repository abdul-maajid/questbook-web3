const SmartBankAccount = artifacts.require("SmartBankAccount");

module.exports = function (deployer) {
  deployer.deploy(SmartBankAccount);
};
