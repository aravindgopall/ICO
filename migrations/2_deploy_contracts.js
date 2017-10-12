const Drops = artifacts.require("./Drops.sol");
const Presale = artifacts.require('./Presale.sol');
const Crowdsale = artifacts.require('./Crowdsale.sol');

module.exports = function(deployer, network) {
   let token

   if(network != 'live') {
     console.log('Deploying contracts...')

     // Deploy the token
     deployer.then(() => {
        return Drops.new()
     }).then(tokenInstance => {
        token = tokenInstance.address

        return deployer.deploy(
           Presale,
           web3.eth.accounts[0],
           token,
           0,
           0, {
              from: web3.eth.accounts[0]
           }
        )
     }).then(() => {
        return deployer.deploy(
           Crowdsale,
           web3.eth.accounts[0],
           token,
           0,
           0, {
              from: web3.eth.accounts[0]
           }
        )
     })
  }
}
