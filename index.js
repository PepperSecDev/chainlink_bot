require('dotenv').config()
const ABI = require('./consumer.abi.json')
const Web3 = require('web3')
let { CONSUMER_CONTRACT, REQUEST_INTERVAL, RPC_URL, PRIVATE_KEY, NODE_JOB_ID, ORACLE_CONTRACT } = process.env
const web3 = new Web3(RPC_URL)
const ethers = require('ethers')

async function main() {
    // web3.eth.accounts.wallet.add('0x' + PRIVATE_KEY)
    // const consumer = new web3.eth.Contract(ABI, CONSUMER_CONTRACT)
    // console.log('before send')
    // const tx = consumer.methods.requestEthereumPrice(ORACLE_CONTRACT, NODE_JOB_ID).send({
    //     from: web3.eth.accounts.wallet.accounts[0].address,
    //     gasPrice: '1000000000',
    //     gas: '200000'
    // })

    // console.log('tx', tx)
    // exit(0)
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
