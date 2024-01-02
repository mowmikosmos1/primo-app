import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export const InboxList = ({ infoList }: { infoList: string[] }) => {
  return (
    <Box
      sx={{ px: 0, width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <nav aria-label="main mailbox folders">
        <List style={{ flexDirection: "column" }}>
          {infoList.map((info) => (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText secondary={info} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};
