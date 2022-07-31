import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const WithdrawModal = ({ open, onClose, handleWithdraw, isWithdrawing }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box width={"90%"} maxWidht={"567px"} padding={2} bgcolor={"background.paper"}>
        <form onSubmit={handleWithdraw}>
          <Typography variant={"h4"}>Withdraw</Typography>

          <Box width={"100%"} marginTop={2}>
            <TextField
              color={"secondary"}
              variant={"filled"}
              name={"amount"}
              type={"number"}
              inputProps={{ step: "0.0001" }}
              label={"Amount To Withdraw"}
              required
              helperText={"You need to withdraw at least 0.1 ETH."}
              FormHelperTextProps={{
                sx: {
                  marginLeft: "0px",
                },
              }}
            />
          </Box>

          <Box
            marginTop={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            sx={{
              gridGap: "16px",
            }}
          >
            <Button size={"small"} color={"secondary"} variant={"outlined"} type={"button"} onClick={onClose}>
              Cancel
            </Button>

            <Button size={"small"} color={"secondary"} variant={"contained"} type={"submit"} disabled={isWithdrawing}>
              {isWithdrawing ? <CircularProgress size={"16px"} color={"secondary"} /> : "Withdraw"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default WithdrawModal;
