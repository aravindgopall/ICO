const assert = require('assert')
const Drops = artifacts.require('Drops')
const Crowdsale = artifacts.require('Crowdsale')

// The token & ICO instance
let drops
let ICOEndTime = String(new Date().getTime()).substring(0, String(new Date().getTime()).length - 3)
let crowdsale

// How transferFrom works:
// You send tokens _to a contract from the tokens the _owner allowed _you to use
contract('Crowdsale', accounts => {

   // Deploy the token every new test
   beforeEach(async () => {
      drops = await Drops.new(ICOEndTime)
      crowdsale = await Crowdsale.new()
   })
})
