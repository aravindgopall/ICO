# ICO
Repository for the Smart Contracts

There're 2 main contracts:
- The token contract: which holds all the functionality to transfer and interact with tokens.
- The Crowdsale contract: which is used to sell tokens on the presale and ICO with different prices that can be set anytime.

## Token Contract
The token contract it's called `Drops.sol` and is pausable. You can stop transfers and allowances to other users in case you need to change the functionality of the contract or if you find some vulnerability. To use it simply create the contract and give an allowance of 90 million tokens to the Crowdsale contract because we decided that 15 million tokens will be sold on the Presale and 75 million on the ICO.

## ICO Contract
The ICO contract is called `Crowdsale.sol` and is essentially used to distribute the tokens. To use this contract you have to execute the constructor with the wallet address, the token address, the presale start time, the presale end time, the ICO start time and the ICO end time.

After creating the contract, you'll have to set the rates for the presale token and the ICO contract. Those variables determine how many tokens you'll get per ether. We do it this way to set the price according to the day of the ICO. It must be set before the presale and ICO.

The presale and ICO will start automatically at the times defined. If you try to buy before the presale the contract will reject the transaction and return the ether sent.

## Testing
To test the Smart Contracts simply create a local blockchain with `testrpc --accounts=3` and `truffle test` in the `fluidai` folder. At least 3 test accounts are needed in testrpc to be able to execute all the test cases.
