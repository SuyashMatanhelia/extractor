const bip39 = require('bip39');
const eth = require('ethereumjs-wallet');

var express = require('express');
var app = express();

app.get('/hello', function(req, res)
{
    var mnemonic = req.query.mnemonic;
    if(mnemonic !== '' && bip39.validateMnemonic(mnemonic))
    {
        var path = `m/44'/60'/0'/0/0`;
    
        var seed = bip39.mnemonicToSeedSync(mnemonic);
        var ethereumHdWallet = eth.hdkey.fromMasterSeed(seed);
        const wallet = ethereumHdWallet.derivePath(path).getWallet();
        const address = '0x'+wallet.getAddress().toString('hex');
        const privateKey = wallet.getPrivateKey().toString('hex');
        var str = address+"\n"+privateKey;
        res.send({status: 'success', message: str});
    }
});
app.listen(3000);


