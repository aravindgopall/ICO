const assert = require('assert')
const Drops = artifacts.require('Drops')
const Crowdsale = artifacts.require('Crowdsale')

// The token & ICO instance
let drops
let crowdsale

// How transferFrom works:
// You send tokens _to a contract from the tokens the _owner allowed _you to use
contract('Crowdsale', function([tokenAddress,investor, wallet, purchaser]){

   // Deploy the token every new test
   beforeEach(async () => {
      
      this.presaleStartTime = web3.eth.getBlock('latest').timestamp + this.days(7)
      this.presaleEndTime = this.presaleStartTime + this.days(7)
      this.ICOStartTime = this.presaleEndTime + this.days(7)
      this.ICOEndTime = this.ICOStartTime + this.days(7)

      drops = await Drops.new(this.ICOEndTime)
      crowdsale = await Crowdsale.new(wallet,tokenAddress,this.presaleStartTime,this.presaleEndTime,this.ICOStartTime,this.ICOEndTime)
   })

   it("the get states function return value should match with current state value",()=> {
		return new Promise(async (resolve,reject) => {
			const currentState =  await crowdsale.States.NotStarted

			assert.equal('not started', await crowdsale.getStates()," the get states function is not working properly")
			resolve()
		})

	})

	it("the update State function should should work based on timestamp",()=>{
		return new Promise(async (resolve,reject) =>{
			const currentState = await crowdsale.states.StatesICO
			await crowdsale.updateState()

			assert.equal(States.ICOEnded, currentState ,"the update state function is wrong")
		})

	})

	describe('accepting payments',() => {
		it('should reject payments before start',() => {
			return new Promise(async (resolve,reject) =>{
				try{
					await crowdsale.buyPresaleTokens() 
				}catch(e){
					return resolve()
				}

				reject() // if there is no exception then something wrong
			})
		})

		it('should accept payments after start',() => {
			return new Promise(async (resolve,reject)=>{
				await increaseTimeTo(this.presaleStartTime)
				try{
					await crowdsale.buyPresaleTokens()
				}catch(e){
					return reject() // this is not the case
				}
				resolve() // there shouldn't be any exception
			})
		})

		it('should reject after end',() => {
			return new Promise(async (resolve,reject)=>{
				await increaseTimeTo(this.presaleEndTime)
				try{
					await crowdsale.buyPresaleTokens()
				}catch(e){
					return resolve() // this is the  case to be handled
				}
				reject() // there should be any exception
			})
		})

		it('should reject ico payments before ico start time',()=>{
			return new Promise(async (resolve,reject)=>{
				try{
					await crowdsale.buyICOtokens()
				}catch(e){
					return resolve()
				}

				reject() // there must be an exception
			})
		})

		it('should accept payments after ico start time',() => {
			return new Promise(async (resolve,reject)=>{
				await increaseTimeTo(this.ICOStartTime)
				try{
					await crowdsale.buyICOtokens()
				}catch(e){
					return reject() // this is not the case
				}
				resolve() // there shouldn't be any exception
			})
		})

		it('should reject after ICO end',() => {
			return new Promise(async (resolve,reject)=>{
				await increaseTimeTo(this.ICOEndTime)
				try{
					await crowdsale.buyICOtokens()
				}catch(e){
					return resolve() // this is the  case to be handled
				}
				reject() // there should be any exception
			})
		})
	})
	
	describe('accepting payments based on paused', () => {
		it('should not accept payments on pause',() => {
			return new Promise(async (resolve,reject) => {
				await drops.pause({
		            from: accounts[0]
		        })
		        const isPaused = await drops.paused()
		        assert.ok(isPaused, "The contract should be pausable by the owner")

		        try{
		        	await crowdsale.buyPresaleTokens()
		        }catch(e){
		        	return resolve() // payments should not be allowed on pause
		        }

		        reject() // there must be a exception
			})
		})

		it('should not accept payments on pause for ICO',() => {
			return new Promise(async (resolve,reject) => {
				await drops.pause({
		            from: accounts[0]
		        })
		        const isPaused = await drops.paused()
		        assert.ok(isPaused, "The contract should be pausable by the owner")

		        try{
		        	await crowdsale.buyICOtokens()
		        }catch(e){
		        	return resolve() // payments should not be allowed on pause
		        }

		        reject() // there must be a exception
			})
		})

	})
})
