require('dotenv').config()
const ABI = require('./consumer.abi.json')
let { CONSUMER_CONTRACT, REQUEST_INTERVAL, RPC_URL, PRIVATE_KEY, NODE_JOB_ID, ORACLE_CONTRACT } = process.env
const ethers = require('ethers')

async function main() {
    let provider = ethers.getDefaultProvider('ropsten');
    let wallet = new ethers.Wallet('0x' + PRIVATE_KEY, provider);
    let contract = new ethers.Contract(CONSUMER_CONTRACT, ABI, provider);
    let contractWithSigner = contract.connect(wallet);

    let tx = await contractWithSigner.requestEthereumPrice(ORACLE_CONTRACT, NODE_JOB_ID, {
        gasPrice: ethers.utils.parseUnits('1.0', 'gwei'),
    });
    console.log(tx.hash)
    await tx.wait();
    setTimeout(main, 1000 * 3600)
    console.log('waiting 3600 sec', Date.now())
}

main()
