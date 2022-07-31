import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useWeb3 from "../hooks/useWeb3";

const DepositTxnItem = ({ user, etherAmount, depositTime }) => {
  const web3 = useWeb3();

  if (!web3) {
    return <></>;
  }

  return (
    <Box width={"100%"} padding={1.5} borderRadius={"4px"} bgcolor={"background.paper"}>
      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        sx={{
          gridGap: "8px",
        }}
        marginBottom={0.5}
      >
        <img width={"25px"} src={"/icons/deposit.png"} />
        <Typography variant={"body1"}>
          <b>Deposited {web3.utils.fromWei(etherAmount)} ETH</b>
        </Typography>
      </Box>

      <Typography
        variant={"body2"}
        color={"text.secondary"}
        sx={{
          textAlign: "right",
        }}
      >
        at {new Date(depositTime * 1000).toLocaleString()}
      </Typography>
    </Box>
  );
};

const WithdrawTxnItem = ({ etherAmountPayed, interestPayed, withdrawalTime }) => {
  const web3 = useWeb3();

  if (!web3) {
    return <></>;
  }

  return (
    <Box width={"100%"} padding={1.5} borderRadius={"4px"} bgcolor={"background.paper"}>
      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        sx={{
          gridGap: "8px",
        }}
        marginBottom={0.5}
      >
        <img width={"25px"} src={"/icons/withdraw.png"} />
        <Typography variant={"body1"}>
          <b>Withdrew {web3.utils.fromWei(etherAmountPayed)} ETH</b> and earned an interest of {parseFloat(web3.utils.fromWei(interestPayed)).toFixed(12)} DBC.
        </Typography>
      </Box>

      <Typography
        variant={"body2"}
        color={"text.secondary"}
        sx={{
          textAlign: "right",
        }}
      >
        at {new Date(withdrawalTime * 1000).toLocaleString()}
      </Typography>
    </Box>
  );
};

const TransferTxnItem = ({ etherAmountTransfered, transferredTo, interestPayed, transferredAt }) => {
  const web3 = useWeb3();

  if (!web3) {
    return <></>;
  }

  return (
    <Box width={"100%"} padding={1.5} borderRadius={"4px"} bgcolor={"background.paper"}>
      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        sx={{
          gridGap: "8px",
        }}
        marginBottom={0.5}
      >
        <img width={"25px"} src={"/icons/transfer.png"} />
        <Typography variant={"body1"}>
          <b>Transffered {web3.utils.fromWei(etherAmountTransfered)} ETH</b> to {transferredTo.slice(0, 12) + "..." + transferredTo.slice(30)} (Earned {parseFloat(web3.utils.fromWei(interestPayed)).toFixed(12)} DBC).
        </Typography>
      </Box>

      <Typography
        variant={"body2"}
        color={"text.secondary"}
        sx={{
          textAlign: "right",
        }}
      >
        at {new Date(transferredAt * 1000).toLocaleString()}
      </Typography>
    </Box>
  );
};

const TransactionItem = ({ event, returnValues }) => {
  return (
    <Box width={"100%"}>
      {(() => {
        switch (event) {
          case "Deposit":
            return <DepositTxnItem {...returnValues} />;

          case "Withdraw":
            return <WithdrawTxnItem {...returnValues} />;

          case "Transfer":
            return <TransferTxnItem {...returnValues} />;

          default:
            return <>AA</>;
        }
      })()}
    </Box>
  );
};

export default TransactionItem;
