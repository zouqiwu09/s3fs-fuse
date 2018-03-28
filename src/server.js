const express = require('express')
const app = express()
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
var Web3Eth = require('web3-eth');
var eth = new Web3Eth('ws://localhost:8545');
var sha256 = require('./sha256');

var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies

app.post('/', function(req, res) {
    var meta_data = req.body.meta;

var blockchain_hash_data = sha256.hash(meta_data, 'string');
    console.log("data: " + blockchain_hash_data);
web3.personal.unlockAccount(web3.eth.accounts[1], "", 15000);
var transaction = web3.eth.sendTransaction({from: web3.eth.accounts[1], data: '0x'+ blockchain_hash_data});
    console.log("Transaction: " + transaction);
    console.log("meta: " + meta_data);
    console.log(req.body);
    res.send(req.body);
    // ...
});

app.listen(3001, () => console.log('Listening on 3001'));
