import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogOutIcon from "@mui/icons-material/Logout";
import { auth, db, logout } from "../db/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Menu({ children }) {
  const logoutButton = () => {
    logout();
  };

  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ firstname: "waiting..." });

  const getDataBydocId = async (collect, value) => {
    const docRef = doc(db, collect, value);
    const docSnap = await getDoc(docRef); //.then(getInfo());

    if (docSnap.exists()) {
      setCurrentUser({ ...docSnap.data() });
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDataBydocId("users", user.uid);
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open="open">
        <Toolbar>
          <Typography variant="h6" noWrap component="div"></Typography>
          <span>{currentUser.firstname + " " + currentUser.lastname}</span>

          <IconButton onClick={logoutButton}>
            <LogOutIcon
              sx={{
                color: "white",
              }}
              edge="end"
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
