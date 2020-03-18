require("dotenv").config({ path: ".env" });
const ABI = require("./consumer.abi.json");
let {
  CONSUMER_CONTRACT,
  REQUEST_INTERVAL,
  PRIVATE_KEY,
  NODE_JOB_ID,
  ORACLE_CONTRACT,
  NETWORK,
  GAS_PRICE
} = process.env;
const ethers = require("ethers");

async function main() {
  let provider = ethers.getDefaultProvider(NETWORK);
  let wallet = new ethers.Wallet("0x" + PRIVATE_KEY, provider);
  let contract = new ethers.Contract(CONSUMER_CONTRACT, ABI, provider);
  let contractWithSigner = contract.connect(wallet);

  let tx = await contractWithSigner.requestEthereumPrice(
    ORACLE_CONTRACT,
    NODE_JOB_ID,
    {
      gasPrice: ethers.utils.parseUnits(GAS_PRICE, "gwei")
    }
  );
  console.log(tx.hash);
  await tx.wait();
  setTimeout(main, 1000 * Number(REQUEST_INTERVAL) * 60);
  console.log(`waiting ${Number(REQUEST_INTERVAL)} min`, Date.now());
}

main();
