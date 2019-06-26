require('dotenv').config()
const ABI = require('./consumer.abi.json')
const Web3 = require('web3')
let { CONSUMER_CONTRACT, REQUEST_INTERVAL, RPC_URL, PRIVATE_KEY, NODE_JOB_ID, ORACLE_CONTRACT } = process.env
const web3 = new Web3(RPC_URL)

async function main() {
    web3.eth.accounts.wallet.add('0x' + PRIVATE_KEY)
    const consumer = web3.eth.Contract(ABI, CONSUMER_CONTRACT)
    
    const tx = await consumer.methods.requestEthereumPrice(ORACLE_CONTRACT, NODE_JOB_ID).send({
        from: web3.eth.accounts.wallet.accounts[0].address,
        gasPrice: '1000000000',
        gas: '200000'
    })

    console.log('tx', tx)
    exit(0)
}

main()
