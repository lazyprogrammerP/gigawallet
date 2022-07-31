import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const SendModal = ({ open, onClose, handleSend, isSending }) => {
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
        <form onSubmit={handleSend}>
          <Typography variant={"h4"}>Send</Typography>

          <Box width={"100%"} marginTop={2}>
            {/* input name={"recipient"} type={"text"} placeholder={"Recipient wallet address..."} /> */}
            <TextField color={"secondary"} variant={"filled"} name={"recipient"} type={"text"} label={"Recipient Wallet"} required />

            <Box marginTop={1}>
              <TextField color={"secondary"} variant={"filled"} name={"amount"} type={"number"} inputProps={{ step: "0.0001" }} label={"Amount To Transfer"} required />
            </Box>
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

            <Button size={"small"} color={"secondary"} variant={"contained"} type={"submit"} disabled={isSending}>
              {isSending ? <CircularProgress size={"16px"} color={"secondary"} /> : "Transfer"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default SendModal;
