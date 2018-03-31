const express = require('express')
const app = express()
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
var Web3Eth = require('web3-eth');
var eth = new Web3Eth('ws://localhost:8545');
console.log();
var sha256 = require('./sha256');
//console.log(web3.eth.accounts);
//var content_sha256 = sha256.hash("pretendThisIsContentSha256", 'string');
var bodyParser = require('body-parser');
//meta = {"Content-Type": "file", "uid": 123, "gid":124, "mode": "010", "mtime":"3514534522132"};
//var hash_sha256 = meta_hash(meta);
//var combined_sha256 = sha256.hash(content_sha256 + hash_sha256, 'string');
function meta_hash(meta) {
  var hstring = "";
  for (x in meta){
    hstring += meta[x];
    hstring += '-';
  }
  return (sha256.hash(hstring, 'string'));

}
web3.eth.personal.unlockAccount("0xbc4ced4631d7febd01e4dbd3b20e8719595ce147", "",30000)
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies

app.post('/', function(req, res) {
    var meta_data = req.body.meta;
        
var blockchain_hash_data = sha256.hash(meta_data, 'string');
    console.log("data: " + blockchain_hash_data);
//web3.eth.personal.unlockAccount("0xbc4ced4631d7febd01e4dbd3b20e8719595ce147", 15000);
web3.eth.sendTransaction({from: "0xbc4ced4631d7febd01e4dbd3b20e8719595ce147", data: '0x'+ blockchain_hash_data})
.on('transactionHash', console.log)
.on('receipt', web3.eth.getTranscationReceipt)
//.on('confirmation', function(confNumber, receipt){ console.log(confNumber) })
.on('error', console.error);
//.catch(function(error){ console.log(error)});
    //console.log("Transaction: " + transaction);
    //console.log("meta: " + meta_data);
    //console.log(req.body);
    res.send(req.body);
    // ...
});

app.listen(3001, () => console.log('Listening on 3001'));

