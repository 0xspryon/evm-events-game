require("dotenv").config()

const gameAddr = process.env.GAME_ADDRESS;
const contractName = process.env.GAME;

if (!gameAddr || !contractName) {
  console.error(`env variables GAME_ADDRESS && GAME weren't defined`)
  process.exit(1)
}

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  // do whatever you need to do to win the game here:
  const txX = await game.setX(25);
  const txY = await game.setY(25);
  const tx = await game.win();

  // did you win? Check the transaction receipt!
  // if you did, it will be in both the logs and events array
  const receipt = await tx.wait();
  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
