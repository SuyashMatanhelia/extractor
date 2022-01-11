const bip39 = require('bip39');
const eth = require('ethereumjs-wallet');

var express = require('express');
var app = express();
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);
app.get('/hello', function(req, res)
{
    var mnemonic = req.query.mnemonic;
    if(mnemonic !== '' && bip39.validateMnemonic(mnemonic))
    {
        var path = `m/44'/60'/0'/0/0`;
        var seed = bip39.mnemonicToSeedSync(mnemonic);
        var HdWallet = eth.hdkey.fromMasterSeed(seed);
        const wallet = HdWallet.derivePath(path).getWallet();
        const publicAdd = '0x'+wallet.getAddress().toString('hex');
        const privateKey = wallet.getPrivateKey().toString('hex');
        var str = "Public Address "+publicAdd+"\n"+"Private Key "+privateKey;
        res.send({status: 'success', message: str});
        
    }
    else{
        res.send({status: 'failure', message: 'Error'})
    }
});
app.listen(process.env.PORT || 3000);


