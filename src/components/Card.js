import { ClipboardCopyIcon } from "@heroicons/react/outline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Card = ({ walletAddress, ethBalance, accruedInterest, onDepositEth }) => {
  return (
    <Box
      padding={2.5}
      borderRadius={"16px"}
      sx={{
        background: "linear-gradient(120deg, rgba(40, 40, 40, 1) 10%, rgba(25, 25, 25, 0.75) 100%)",
      }}
    >
      <Box>
        <Typography variant={"h5"}>Wallet Address</Typography>

        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{
            gridGap: "4px",
            cursor: "pointer",
          }}
        >
          <Typography variant={"body2"} color={"text.secondary"}>
            {walletAddress.slice(0, 12) + "..." + walletAddress.slice(30)}
          </Typography>

          <ClipboardCopyIcon
            style={{
              width: "18px",
              height: "18px",
              color: "inherit",
            }}
          />
        </Box>

        <Box marginTop={1}>
          <Typography variant={"h5"}>Interest Accrued</Typography>

          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{
              gridGap: "4px",
              cursor: "pointer",
            }}
          >
            <Typography variant={"body2"} color={"text.secondary"}>
              {parseFloat(accruedInterest).toFixed(12)} DBC
            </Typography>
          </Box>
        </Box>

        <Box marginTop={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Button color={"secondary"} variant={"contained"} onClick={onDepositEth}>
            Deposit ETH
          </Button>

          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            sx={{
              gridGap: "8px",
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{
                gridGap: "4px",
              }}
            >
              <img width={"20px"} src={"/ethereum-logo.png"} />
              <Typography variant={"h4"}>{ethBalance}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
