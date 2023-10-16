const donate = artifacts.require("donation");
module.exports = function(deployer) {
    deployer.deploy(donate);
};