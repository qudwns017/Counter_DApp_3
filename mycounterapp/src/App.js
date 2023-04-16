import { ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import { useState } from "react";
import {
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  const contractAddress = "0x9bf5483DB2eB6375Df285B44055CB6d0F1e7f73a";
  const { contract } = useContract(contractAddress);

  // get
  const { data } = useContractRead(contract, "getCounter");
  const [counter, setCounter] = useState();

  // increment
  const { mutateAsync: incrementCounter } = useContractWrite(
    contract,
    "incrementCounter"
  );

  // decrement
  const { mutateAsync: decrementCounter } = useContractWrite(
    contract,
    "decrementCounter"
  );

  async function getCounter() {
    if (!contract) return;
    setCounter(parseInt(data._hex));
  }

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">DApp Counter</h1>

        <p className="description">
          ThirdWeb의 React 템플릿을 이용하여 만든 DApp Counter
        </p>

        <div className="connect">
          <ConnectWallet
            dropdownPosition={{ side: "bottom", align: "center" }}
          />
        </div>

        <div className="counter">{parseInt(data)}</div>

        <br />
        <Web3Button contractAddress={contractAddress} action={getCounter}>
          Refresh Counter
        </Web3Button>
        <br />
        <Web3Button contractAddress={contractAddress} action={incrementCounter}>
          Increment Counter
        </Web3Button>
        <br />
        <Web3Button contractAddress={contractAddress} action={decrementCounter}>
          Decrement Counter
        </Web3Button>
        <p className="description">91813171 최병준</p>
      </main>
    </div>
  );
}
