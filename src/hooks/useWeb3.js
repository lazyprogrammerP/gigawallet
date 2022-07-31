import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

const useWeb3 = () => {
  const navigate = useNavigate();
  const [web3, setWeb3] = useState();

  useEffect(() => {
    const connectToWeb3 = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.enable();

          try {
            setWeb3(new Web3(window.ethereum));
          } catch {
            window.alert("Error connecting to your Metamask Wallet.");
          }
        } catch (err) {
          navigate("/connect-wallet");
        }
      } else {
        window.alert("Please install the Metamask extension.");
      }
    };

    connectToWeb3();
  }, []);

  return web3;
};

export default useWeb3;
