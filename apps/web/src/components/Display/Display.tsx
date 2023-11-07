// import { parseEther } from "ethers";

import Tickets from "~/components/Tickets/Tickets";
import TicketsOwned from "~/components/TicketsOwned/TicketsOwned";
import styles from "./Display.module.css";

export const Display = () => {
  const bigNumberify = (amt: string) => BigInt(amt);

  const ethGa = "0.01";
  const ethVip = "0.02";
  const ethGaHex = bigNumberify(ethGa).toString(16);
  const ethVipHex = bigNumberify(ethVip).toString(16);
  const tickets = [
    {
      type: "ga",
      event: "ETH Atlantis",
      description: "General Admission",
      price: ethGa,
      priceHexValue: ethGaHex, // '0x2386f26fc10000' *eserialize.com
    },
    {
      type: "vip",
      event: "ETH Atlantis",
      description: "VIP",
      price: ethVip,
      priceHexValue: ethVipHex, // '0x470de4df820000' *eserialize.com
    },
  ];

  return (
    <div className={styles.display}>
      <Tickets tickets={tickets} />
      <TicketsOwned />
    </div>
  );
};
