import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import DBank from "../build/contracts/DBank.json";
import DCBToken from "../build/contracts/DCBToken.json";
import useWeb3 from "../hooks/useWeb3";
import Card from "./Card";
import DepositModal from "./DepositModal";
import SendModal from "./SendModal";
import TransactionItem from "./TransactionItem";
import WithdrawModal from "./WithdrawModal";

const Dashboard = () => {
  const web3 = useWeb3();

  const [defaultAccount, setDefaultAccount] = useState(null);
  const [contracts, setContracts] = useState({
    DCBTokenJS: null,
    DBankJS: null,
    DBankAddress: null,
  });

  const [bankBalance, setBankBalance] = useState(0);

  const [interestEarned, setInterestEarned] = useState(0);

  const [transactions, setTransactions] = useState([]);

  const [blockchainLoaded, setBlockchainLoaded] = useState(false);

  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const toggleDepositModal = () => {
    setDepositModalOpen((prev) => !prev);
  };

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const toggleWithdrawModal = () => {
    setWithdrawModalOpen((prev) => !prev);
  };

  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const toggleSendModal = () => {
    setSendModalOpen((prev) => !prev);
  };

  const reloadData = async (DBankJS, _defaultAccount = defaultAccount) => {
    const _bankBalance = await DBankJS.methods.depositedEther(_defaultAccount).call();
    setBankBalance(web3.utils.fromWei(_bankBalance));

    const _interestEarned = await DBankJS.methods.interestPaid(_defaultAccount).call();
    setInterestEarned(web3.utils.fromWei(_interestEarned));

    await DBankJS.getPastEvents({ fromBlock: 0, toBlock: "latest", filter: { from: _defaultAccount } })
      .then((res) => {
        setTransactions(res);
      })
      .catch(console.log);
  };

  const loadBlockchainData = async () => {
    if (typeof window.ethereum !== "undefined") {
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();
      const _defaultAccount = accounts[0];

      let DCBTokenJS, DBankJS, DBankAddress;
      try {
        DCBTokenJS = new web3.eth.Contract(DCBToken.abi, DCBToken.networks[netId].address);
        DBankJS = new web3.eth.Contract(DBank.abi, DBank.networks[netId].address);
        DBankAddress = DBank.networks[netId].address;
      } catch (err) {
        window.alert("Smart contract not deployed to the blockchain.");
      }

      // setWeb3(web3);
      setDefaultAccount(_defaultAccount);
      setContracts({
        DCBTokenJS,
        DBankJS,
        DBankAddress,
      });

      await reloadData(DBankJS, _defaultAccount);

      setBlockchainLoaded(true);
    } else {
      window.alert("Please install the Metamask extension.");
    }
  };

  useEffect(() => {
    if (web3) {
      loadBlockchainData();
    }
  }, [web3]);

  const handleDeposit = async (e) => {
    e.preventDefault();

    setIsDepositing(true);

    let { amount } = e.target;
    amount = web3.utils.toWei(amount.value);

    try {
      await contracts.DBankJS.methods.deposit().send({ from: defaultAccount, value: amount.toString() });
      await reloadData(contracts.DBankJS);
    } catch (err) {
      console.log(err);
      setIsDepositing(false);
      window.alert("Transaction couldn't be authorized.");
    }

    e.target.amount.value = null;
    setIsDepositing(false);
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();

    setIsWithdrawing(true);

    let { amount } = e.target;
    amount = web3.utils.toWei(amount.value);

    try {
      await contracts.DBankJS.methods.withdraw(amount).send({ from: defaultAccount });
      await reloadData(contracts.DBankJS);
    } catch (err) {
      console.log(err);
      setIsWithdrawing(false);
      window.alert("Transaction couldn't be authorized.");
    }

    e.target.amount.value = null;
    setIsWithdrawing(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    setIsSending(true);

    let { recipient, amount } = e.target;
    recipient = recipient.value;
    amount = web3.utils.toWei(amount.value);

    try {
      await contracts.DBankJS.methods.transferTo(recipient, amount).send({ from: defaultAccount });
      await reloadData(contracts.DBankJS);
    } catch (err) {
      console.log(err);
      setIsSending(false);
      window.alert("Transaction couldn't be authorized.");
    }

    e.target.recipient.value = null;
    e.target.amount.value = null;

    setIsSending(false);
  };

  if (!web3) {
    return <></>;
  }

  return blockchainLoaded ? (
    <Box width={"100%"} minHeight={"100vh"} padding={2} bgcolor={"background.default"}>
      <Card walletAddress={defaultAccount} ethBalance={bankBalance} accruedInterest={interestEarned} onDepositEth={toggleDepositModal} />

      <Box
        marginTop={2}
        display={"flex"}
        alignItems={"center"}
        sx={{
          gridGap: "8px",
        }}
      >
        <Box
          padding={1.5}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          border={"0px"}
          borderRadius={"8px"}
          color={"text.secondary"}
          bgcolor={"background.paper"}
          sx={{
            gridGap: "8px",
            cursor: "pointer",
          }}
          component={"button"}
          onClick={toggleDepositModal}
        >
          <img width={"20px"} src={"/icons/deposit.png"} />
          <Typography variant={"h5"}>Deposit</Typography>
        </Box>

        <Box
          padding={1.5}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          border={"0px"}
          borderRadius={"8px"}
          color={"text.secondary"}
          bgcolor={"background.paper"}
          sx={{
            gridGap: "8px",
            cursor: "pointer",
          }}
          component={"button"}
          onClick={toggleWithdrawModal}
        >
          <img width={"20px"} src={"/icons/withdraw.png"} />
          <Typography variant={"h5"}>Withdraw</Typography>
        </Box>

        <Box
          padding={1.5}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          border={"0px"}
          borderRadius={"8px"}
          color={"text.secondary"}
          bgcolor={"background.paper"}
          sx={{
            gridGap: "8px",
            cursor: "pointer",
          }}
          component={"button"}
          onClick={toggleSendModal}
        >
          <img width={"20px"} src={"/icons/transfer.png"} />
          {/* <Typography variant={"h5"}>Send</Typography> */}
        </Box>
      </Box>

      <Box marginTop={2}>
        <Typography variant={"h4"}>Transaction History</Typography>

        <Box
          marginTop={1}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          sx={{
            gridGap: "8px",
          }}
        >
          {transactions.map((transaction) => {
            return <TransactionItem key={transaction.id} event={transaction.event} returnValues={transaction.returnValues} />;
          })}
        </Box>
      </Box>

      <DepositModal open={depositModalOpen} onClose={toggleDepositModal} handleDeposit={handleDeposit} isDepositing={isDepositing} />
      <WithdrawModal open={withdrawModalOpen} onClose={toggleWithdrawModal} handleWithdraw={handleWithdraw} isWithdrawing={isWithdrawing} />
      <SendModal open={sendModalOpen} onClose={toggleSendModal} handleSend={handleSend} isSending={isSending} />

      {/* <form onSubmit={handleDeposit}>
        <h1>Deposit</h1>
        <input name={"amount"} type={"number"} step={"0.0001"} placeholder={"Amount to deposit..."} />
        <p>A minimum of 0.1 ETH is required to deposit.</p>
        <button type={"submit"}>Deposit</button>
      </form>

      <form onSubmit={handleWithdraw}>
        <h1>Withdraw</h1>
        <p>Do you want to withdraw your principal amount ({bankBalance}) + your interest amount?</p>
        <input name={"amount"} type={"number"} step={"0.0001"} placeholder={"Amount to withdraw..."} />
        <p>A minimum of 0.1 ETH is required to withdraw.</p>
        <button type={"submit"}>Withdraw</button>
      </form>

      <form onSubmit={handleTransfer}>
        <h1>Transfer</h1>
        <p>Do you want to withdraw your principal amount?</p>
        <input name={"recipient"} type={"text"} placeholder={"Recipient wallet address..."} />
        <input name={"amount"} type={"number"} step={"0.0001"} placeholder={"Amount to transfer..."} />
        <p>A minimum of 0.1 ETH is required to withdraw.</p>
        <button type={"submit"}>Transfer</button>
      </form> */}
    </Box>
  ) : (
    <></>
  );
};

export default Dashboard;
