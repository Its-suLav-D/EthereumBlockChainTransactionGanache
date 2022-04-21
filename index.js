var Web3 = require('web3');
// Module for Creating, Manipulating and signing Token 
var EthereumTransaction = require('ethereumjs-tx').Transaction;
var url = 'HTTP://127.0.0.1:7545';

var web3 = new Web3(url);



var sendingAddress = '0xEeF698D380c1263369b410e375cF4b3d4169b4f5'
var recievingAddress = '0x141804f8c85f7449BC623Ed5BdA12782a23E85BF'

// Check the Balance of Each Transactions 

web3.eth.getBalance(sendingAddress)
    .then(balance=>
        {
            const b = web3.utils.fromWei(balance,'ether')
            console.log(`Balance of Sending Account:${b} Ether `)
        })
    .catch(error=> {
        console.log("Error Getting Balance ")
    })


web3.eth.getBalance(recievingAddress)
    .then(balance=>
        {
            const b = web3.utils.fromWei(balance,'ether')
            console.log(`Balance of Recieving Account:${b} Ether `)
        })
    .catch(error=> 
        {
            console.log("There was error recieving Balance") 
        })

// Step 4. Create Transactions using the transaction variables as shown:

var rawTransaction = { 
    nonce: web3.utils.toHex(0),
    to: recievingAddress,
    gasPrice: web3.utils.toHex(20000000),
    gasLimit: web3.utils.toHex(30000),
    value: web3.utils.toHex(100),
    data: web3.utils.toHex("")    
}

// Step 5. Sign the Transaction with the HEX value of the private key of the sender 

var privateKeySender = 'f8b375833fc18f030fdf496d5cf3253a812a4b75053c5e43dfa74f4fa3c0dff8'
// To Sign a transaction, we will need a hex value of the private key 
// We utilize the Buffer to encode the string as a hex 
const privateKeySenderHex = new Buffer.from(privateKeySender, 'hex');

var transaction = new EthereumTransaction(rawTransaction);

transaction.sign(privateKeySenderHex);


// Step 6. Send the serialized signed transaction to the Ethereum Network

var serializedTransaction = transaction.serialize(); 
web3.eth.sendSignedTransaction(serializedTransaction);


// web3.eth.getAccounts()
//     .then(accounts=>{
//         console.log(accounts)
//     })
//     .catch(err => {
//         console.log("Errow was detected!!!")
//         console.log(err);
//     })