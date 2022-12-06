import CampaignIcon from "@mui/icons-material/Campaign";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Collapse,
  IconButton,
  styled,
  Toolbar,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AppBarHeader from "./AppBarHeader";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, sidebarOpen }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(sidebarOpen && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, sidebarOpen }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(sidebarOpen && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!sidebarOpen && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [listOpen, setListOpen] = React.useState(true);

  const handleListClick = () => {
    setListOpen(!listOpen);
  };

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setListOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sidebarOpen={sidebarOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleSidebarOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(sidebarOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            FALL 2022-2023
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sidebarOpen={sidebarOpen}
        variant="permanent"
        PaperProps={{ sx: { backgroundColor: "#394263", color: "white" } }}
      >
        <AppBarHeader>
          <IconButton onClick={handleSidebarClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </AppBarHeader>
        <Divider sx={{ bgcolor: "#e0e0e0" }} />
        <List>
          <ListItem sx={{ justifyContent: "center" }}>
            <Box
              component="img"
              sx={{
                width: 150,
                height: 50,
                ...(!sidebarOpen && { display: "none" }),
              }}
              src={"/sula.png"}
            />
            {!sidebarOpen ? <Box sx={{ height: 50 }}></Box> : <div></div>}
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    ...(!sidebarOpen && { width: 38, height: 38 }),
                  }}
                  src={
                    "https://m.media-amazon.com/images/M/MV5BMGIyYjNhOTUtM2UxNC00MjFlLTkwZGYtNDQ0MDhmNGNkYWNlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"
                  }
                ></Avatar>
              </Box>
              <Typography
                sx={{
                  textAlign: "center",
                  padding: "3px",
                  ...(!sidebarOpen && { display: "none" }),
                }}
              >
                Ad Soyad
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  padding: "3px",
                  ...(!sidebarOpen && { display: "none" }),
                }}
              >
                Instructor
              </Typography>
              {!sidebarOpen ? <Box sx={{ height: 91 }}></Box> : <div></div>}
            </Box>
          </ListItem>
          <ListItem sx={{ padding: "0px" }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <HomeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Home"}
                sx={{ opacity: sidebarOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ padding: "0px" }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <SearchIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Search"}
                sx={{ opacity: sidebarOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ padding: "0px" }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <NotificationsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Notifications"}
                sx={{ opacity: sidebarOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ bgcolor: "#e0e0e0", margin: "3px" }} />
          <ListItem sx={{ padding: "0px" }}>
            <ListItemButton onClick={handleListClick}>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <CampaignIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Announcements"}
                sx={{ opacity: sidebarOpen ? 1 : 0 }}
              />
              {sidebarOpen && (listOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          <Collapse in={listOpen} timeout="auto">
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
              <ListItemText
                primary={"History"}
                sx={{ opacity: sidebarOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
