import { ethers } from "hardhat";
import * as fs from "fs/promises";
import path from "path";

async function main() {
  const tickets = await ethers.deployContract("ETHTickets");
  const networkId = await ethers.provider.getNetwork();
  const networkIdHex = `0x${networkId.chainId.toString(16)}`;
  console.log(networkIdHex);

  const filePath = path.join(__dirname, "../../web/src/lib/config.json");

  // read file as string
  const configFile = await fs.readFile(filePath, "utf-8");
  // parse string to JSON
  const config = JSON.parse(configFile);
  // add contract address to config
  config[networkIdHex].contractAddress = tickets.target;
  // write JSON to file
  await fs.writeFile(filePath, JSON.stringify(config, null, 2));

  console.log(
    `ETHTickets deployed to: ${tickets.target} on network: ${networkId.name} (${networkIdHex}), config file updated.`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
