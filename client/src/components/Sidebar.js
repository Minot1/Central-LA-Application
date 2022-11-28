import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import HistoryIcon from "@mui/icons-material/History";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CampaignIcon from "@mui/icons-material/Campaign";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Collapse } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Sidebar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      open={true}
      anchor="left"
      variant="persistent"
      sx={{
        width: "220px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "220px",
        },
      }}
      PaperProps={{ sx: { backgroundColor: "#394263", color: "white" } }}
    >
      <List>
        <ListItem sx={{ justifyContent: "center" }}>
          <Box
            component="img"
            sx={{
              width: 150,
              height: 50,
            }}
            src={"/sula.png"}
          />
        </ListItem>
        <ListItem disablePadding>
          <Box
            sx={{
              backgroundColor: "#4D5571",
              flex: "1",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Avatar sx={{ width: 70, height: 70 }} src={"https://m.media-amazon.com/images/M/MV5BMGIyYjNhOTUtM2UxNC00MjFlLTkwZGYtNDQ0MDhmNGNkYWNlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"}></Avatar>
            </Box>
            <Typography sx={{ textAlign: 'center', padding: "3px" }}>Ad Soyad</Typography>
            <Typography sx={{ textAlign: 'center', padding: "3px" }}>Instructor</Typography>
          </Box>
        </ListItem>
        <ListItem sx={{ padding: "0px" }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <HomeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ padding: "0px" }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <SearchIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Search"} />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ padding: "0px" }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <NotificationsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Notifications"} />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ bgcolor: "#e0e0e0", margin: "3px" }} />
        <ListItem sx={{ padding: "0px" }}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <CampaignIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Announcements"} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List>
            <ListItem sx={{ padding: "0px" }}>
              <ListItemButton>
                <ListItemText
                  primary={"All Announcements"}
                  sx={{ textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ padding: "0px" }}>
              <ListItemButton>
                <ListItemText
                  primary={"My Announcements"}
                  sx={{ textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
        <Divider sx={{ bgcolor: "#e0e0e0", margin: "3px" }} />
        <ListItem sx={{ padding: "0px" }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <HistoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"History"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
