const execSync = require("child_process").execSync
// replace the name of the contract with which one you want to deploy!
const contractName = process.env.GAME;
if (!contractName) {
  console.error(`env variable GAME wasn't defined`)
  process.exit(1)
}

async function main() {
  const Game = await hre.ethers.getContractFactory(contractName);
  // if you need to add constructor arguments for the particular game, add them here:
  const game = await Game.deploy();
  console.log(`${contractName} deployed to address: ${game.address}`);
  try {
    execSync(`rm .env`, { encoding: "utf-8"})
  } catch(err) {}
  execSync(`echo "GAME_ADDRESS=${game.address}" >> .env`, { encoding: "utf-8"})
  execSync(`echo "GAME=${contractName}" >> .env`, { encoding: "utf-8"})
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });