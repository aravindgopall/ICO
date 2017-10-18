const assert = require('assert')
const Drops = artifacts.require('Drops')
const ICO = artifacts.require('ICO')

// The token & ICO instance
let drops
let ico

// How transferFrom works:
// You send tokens _to a contract from the tokens the _owner allowed _you to use
contract('ICO', accounts => {

   // Deploy the token every new test
   beforeEach(async () => {
      drops = await Drops.new()
      ico = await ICO.new()
   })
})
