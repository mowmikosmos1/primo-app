import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { InfoType } from "./App";
import { info } from "console";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const InboxList = ({ infoList }: { infoList: InfoType[] }) => {
  const [open, setOpen] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<InfoType>();

  console.log(infoList);
  const handleOpen = (info: InfoType) => {
    setCurrentInfo(info);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          px: 0,
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List style={{ flexDirection: "column" }}>
            {infoList.map((info) => (
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleOpen(info)}>
                  <ListItemText secondary={info.topic} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {currentInfo?.topic}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {currentInfo?.text}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {currentInfo?.created.toDateString()}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            user placeholder
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
