import React, { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min";

const useWeb3 = () => {
  // 커스텀훅의 리턴값으로 넘겨 줄 account와 web3객체를 state로 만듦.
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  // component 렌더링이 완료되면 내부의 async 콜백함수가 실행.
  useEffect(() => {
    (async () => {
      // 메타마스크 설치 안된 경우 바로 리턴해서 함수 종료!
      if (!window.ethereum) return;

      // 메타마스크의 account정보를 가져온다.
      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(address);

      // web3로 메타마스크와 통신
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    })();
  }, []);

  return [web3, account];
};

export default useWeb3;
